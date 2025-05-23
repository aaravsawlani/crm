import { filterDictionary } from "./filterDictionary";
import { operatorTemplates, OperatorKey } from "./operators";

// Mapping from descriptive membership status to numerical codes
const MEMBERSHIP_STATUS_CODES: Record<string, number> = {
  "Plan Used": 0,
  "Joined": 1,
  "Transfer In": 2,
  "Renewed": 3,
  "Resumed": 6,
  "Discontinuing": 7,
  "Plan Expired": 21,
  "Discontinued": 27,
  "Terminated": 29,
  "Transfer Out": 30,
  "Suspended": 40,
  "Card Expired": 110,
  "Card Declined": 120,
  "Recharge Problem": 130,
  "Enter/Swipe New Credit Card": 140,
  "New Card is Approved": 150,
  "Credit Card Changed": 200,
  "Join Date Changed": 201,
};

export interface FilterInput {
  property: string;
  operator: OperatorKey;
  value: any;
  timeUnit?: string; // e.g., days, weeks for within last
}

export interface BuildResult {
  sql: string;
  params: any[];
  fromView: string;
}

export function buildQuery(filters: FilterInput[]): BuildResult {
  if (filters.length === 0) {
    return {
      sql: "SELECT FIRST 100 * FROM V_CUSTOMER", // default
      params: [],
      fromView: "V_CUSTOMER",
    };
  }

  const baseView = "V_CUSTOMER";
  const baseAlias = "c";

  const whereClauses: string[] = [];
  const params: any[] = [];
  const joinSet: Set<string> = new Set();

  filters.forEach((f) => {
    // Special handling for filters that need custom logic - handle before dictionary lookup
    
    // Special handling for membership average visits - calculate dynamically
    if (f.property === "Membership average visits" || f.property === "Average visits") {
      console.log("Processing Average visits filter:", f);
      const value = Number(f.value) || 0;
      console.log("Parsed value:", value);
      
      // Build the average calculation subquery - rolling 12 month average
      // Simplified for Firebird Dialect 1 compatibility
      const avgCalculation = `(
        SELECT (COALESCE(visit_count.total_visits, 0) * 1.0) / 12.0
        FROM (
          SELECT COUNT(*) as total_visits
          FROM V_CUSTOMERCODE cc_inner, V_SALE sale_inner, V_TERMINAL term_inner
          WHERE cc_inner.CUSTOMER = c.OBJID
          AND sale_inner.CUSTOMERCODE = cc_inner.OBJID
          AND term_inner.OBJID = sale_inner.TERMINAL
          AND term_inner.NAME <> 'Automatic Recharge'
          AND sale_inner.LOGDATE >= DATEADD(-12 MONTH TO CURRENT_TIMESTAMP)
        ) visit_count
      )`;

      if (f.operator === "is greater than") {
        whereClauses.push(`${avgCalculation} > ${value}`);
        console.log("Added greater than condition");
      } else if (f.operator === "is less than") {
        whereClauses.push(`${avgCalculation} < ${value}`);
        console.log("Added less than condition");
      } else if (f.operator === "is greater than or equal to") {
        whereClauses.push(`${avgCalculation} >= ${value}`);
        console.log("Added greater than or equal condition");
      } else if (f.operator === "is less than or equal to") {
        whereClauses.push(`${avgCalculation} <= ${value}`);
        console.log("Added less than or equal condition");
      } else if (f.operator === "is") {
        whereClauses.push(`${avgCalculation} = ${value}`);
        console.log("Added equals condition");
      } else if (f.operator === "is not") {
        whereClauses.push(`${avgCalculation} <> ${value}`);
        console.log("Added not equals condition");
      }
      
      console.log("Current whereClauses:", whereClauses);
      return; // Skip the normal processing for this filter
    }

    // Special handling for recent visits - count visits in specified days
    if (f.property === "Recent visits") {
      console.log("Processing Recent visits filter:", f);
      
      // Extract count and days from compound value
      const targetCount = Number(f.value?.count) || 0;
      const lookbackDays = Number(f.value?.days) || 0;
      
      console.log("Target count:", targetCount, "Lookback days:", lookbackDays);
      
      // Build the visit count subquery
      const visitCountCalculation = `(
        SELECT COUNT(*) 
        FROM V_CUSTOMERCODE cc_inner, V_SALE sale_inner, V_TERMINAL term_inner
        WHERE cc_inner.CUSTOMER = c.OBJID
        AND sale_inner.CUSTOMERCODE = cc_inner.OBJID
        AND term_inner.OBJID = sale_inner.TERMINAL
        AND term_inner.NAME <> 'Automatic Recharge'
        AND sale_inner.LOGDATE >= DATEADD(-${lookbackDays} DAY TO CURRENT_TIMESTAMP)
      )`;

      if (f.operator === "is greater than") {
        whereClauses.push(`${visitCountCalculation} > ${targetCount}`);
        console.log("Added greater than condition");
      } else if (f.operator === "is less than") {
        whereClauses.push(`${visitCountCalculation} < ${targetCount}`);
        console.log("Added less than condition");
      } else if (f.operator === "is greater than or equal to") {
        whereClauses.push(`${visitCountCalculation} >= ${targetCount}`);
        console.log("Added greater than or equal condition");
      } else if (f.operator === "is less than or equal to") {
        whereClauses.push(`${visitCountCalculation} <= ${targetCount}`);
        console.log("Added less than or equal condition");
      } else if (f.operator === "is") {
        whereClauses.push(`${visitCountCalculation} = ${targetCount}`);
        console.log("Added equals condition");
      } else if (f.operator === "is not") {
        whereClauses.push(`${visitCountCalculation} <> ${targetCount}`);
        console.log("Added not equals condition");
      }
      
      console.log("Current whereClauses:", whereClauses);
      return; // Skip the normal processing for this filter
    }

    // Special handling for total visits - count all visits ever
    if (f.property === "Total visits") {
      console.log("Processing Total visits filter:", f);
      const targetCount = Number(f.value) || 0;
      console.log("Target count:", targetCount);
      
      // Build the total visit count subquery
      const totalVisitCountCalculation = `(
        SELECT COUNT(*) 
        FROM V_CUSTOMERCODE cc_inner, V_SALE sale_inner, V_TERMINAL term_inner
        WHERE cc_inner.CUSTOMER = c.OBJID
        AND sale_inner.CUSTOMERCODE = cc_inner.OBJID
        AND term_inner.OBJID = sale_inner.TERMINAL
        AND term_inner.NAME <> 'Automatic Recharge'
      )`;

      if (f.operator === "is greater than") {
        whereClauses.push(`${totalVisitCountCalculation} > ${targetCount}`);
        console.log("Added greater than condition");
      } else if (f.operator === "is less than") {
        whereClauses.push(`${totalVisitCountCalculation} < ${targetCount}`);
        console.log("Added less than condition");
      } else if (f.operator === "is greater than or equal to") {
        whereClauses.push(`${totalVisitCountCalculation} >= ${targetCount}`);
        console.log("Added greater than or equal condition");
      } else if (f.operator === "is less than or equal to") {
        whereClauses.push(`${totalVisitCountCalculation} <= ${targetCount}`);
        console.log("Added less than or equal condition");
      } else if (f.operator === "is") {
        whereClauses.push(`${totalVisitCountCalculation} = ${targetCount}`);
        console.log("Added equals condition");
      } else if (f.operator === "is not") {
        whereClauses.push(`${totalVisitCountCalculation} <> ${targetCount}`);
        console.log("Added not equals condition");
      }
      
      console.log("Current whereClauses:", whereClauses);
      return; // Skip the normal processing for this filter
    }

    // Special handling for is a member - check if customer has membership records
    if (f.property === "Is a member") {
      console.log("Processing Is a member filter:", f);
      const isMember = f.value === "true" || f.value === true;
      console.log("Is member value:", isMember);
      
      if (isMember) {
        // Customer IS a member - must have record in V_SALEPASSES
        whereClauses.push(`EXISTS (
          SELECT 1 FROM V_SALEPASSES sp_member 
          WHERE sp_member.CUSTOMER = c.OBJID
        )`);
        console.log("Added EXISTS condition for members");
      } else {
        // Customer is NOT a member - must NOT have record in V_SALEPASSES
        whereClauses.push(`NOT EXISTS (
          SELECT 1 FROM V_SALEPASSES sp_member 
          WHERE sp_member.CUSTOMER = c.OBJID
        )`);
        console.log("Added NOT EXISTS condition for non-members");
      }
      
      console.log("Current whereClauses:", whereClauses);
      return; // Skip the normal processing for this filter
    }

    // Special handling for membership status - convert descriptive names to codes
    if (f.property === "Membership status") {
      console.log("Processing Membership status filter:", f);
      
      // Convert descriptive status names to numerical codes
      let statusCodes: number[] = [];
      if (Array.isArray(f.value)) {
        statusCodes = f.value
          .map(status => MEMBERSHIP_STATUS_CODES[status])
          .filter(code => code !== undefined);
      } else if (f.value && MEMBERSHIP_STATUS_CODES[f.value] !== undefined) {
        statusCodes = [MEMBERSHIP_STATUS_CODES[f.value]];
      }
      
      console.log("Status codes:", statusCodes);
      
      if (statusCodes.length > 0) {
        if (f.operator === "is") {
          const placeholders = statusCodes.map(() => "?").join(", ");
          // Use V_Sale.LogDate to find most recent membership transaction for current status
          whereClauses.push(`EXISTS (
            SELECT 1 FROM V_SALEPASSES sp
            JOIN V_SALE sale ON sale.OBJID = sp.SALEID
            WHERE sp.CUSTOMER = c.OBJID 
            AND sp.STATUS IN (${placeholders})
            AND sale.LOGDATE = (
              SELECT MAX(sale_max.LOGDATE)
              FROM V_SALEPASSES sp_max
              JOIN V_SALE sale_max ON sale_max.OBJID = sp_max.SALEID
              WHERE sp_max.CUSTOMER = c.OBJID
            )
          )`);
          params.push(...statusCodes);
        } else if (f.operator === "is not") {
          const placeholders = statusCodes.map(() => "?").join(", ");
          // Use V_Sale.LogDate to find most recent membership transaction for current status
          whereClauses.push(`NOT EXISTS (
            SELECT 1 FROM V_SALEPASSES sp
            JOIN V_SALE sale ON sale.OBJID = sp.SALEID
            WHERE sp.CUSTOMER = c.OBJID 
            AND sp.STATUS IN (${placeholders})
            AND sale.LOGDATE = (
              SELECT MAX(sale_max.LOGDATE)
              FROM V_SALEPASSES sp_max
              JOIN V_SALE sale_max ON sale_max.OBJID = sp_max.SALEID
              WHERE sp_max.CUSTOMER = c.OBJID
            )
          )`);
          params.push(...statusCodes);
        }
      }
      
      console.log("Current whereClauses:", whereClauses);
      return; // Skip the normal processing for this filter
    }

    // Special handling for membership last charge date - find last successful automatic recharge
    if (f.property === "Membership last charge date") {
      console.log("Processing Membership last charge date filter:", f);
      const days = Math.abs(Number(f.value)) || 0;
      console.log("Days:", days);
      
      if (f.operator === "is within last") {
        whereClauses.push(`EXISTS (
          SELECT 1 FROM V_CUSTOMERCODE cc_charge
          JOIN V_SALE sale_charge ON sale_charge.CUSTOMERCODE = cc_charge.OBJID
          JOIN V_TERMINAL term_charge ON term_charge.OBJID = sale_charge.TERMINAL
          WHERE cc_charge.CUSTOMER = c.OBJID
          AND term_charge.NAME = 'Automatic Recharge'
          AND sale_charge.STATUS = -32768
          AND sale_charge.LOGDATE >= DATEADD(-${days} DAY TO CURRENT_TIMESTAMP)
        )`);
        console.log("Added within last condition for last charge date");
      } else if (f.operator === "is not within last") {
        // Customer either has no charges in the timeframe, or no successful charges at all
        whereClauses.push(`NOT EXISTS (
          SELECT 1 FROM V_CUSTOMERCODE cc_charge
          JOIN V_SALE sale_charge ON sale_charge.CUSTOMERCODE = cc_charge.OBJID
          JOIN V_TERMINAL term_charge ON term_charge.OBJID = sale_charge.TERMINAL
          WHERE cc_charge.CUSTOMER = c.OBJID
          AND term_charge.NAME = 'Automatic Recharge'
          AND sale_charge.STATUS = -32768
          AND sale_charge.LOGDATE >= DATEADD(-${days} DAY TO CURRENT_TIMESTAMP)
        )`);
        console.log("Added not within last condition for last charge date");
      }
      
      console.log("Current whereClauses:", whereClauses);
      return; // Skip the normal processing for this filter
    }

    // Special handling for membership failed recharge attempts - count failed attempts since last successful charge
    if (f.property === "Membership failed recharge attempts") {
      console.log("Processing Membership failed recharge attempts filter:", f);
      const targetCount = Number(f.value) || 0;
      console.log("Target count:", targetCount);
      
      // Simplified approach for performance - just count failed attempts in last 7 days
      // without complex membership status checking
      const failedAttemptsCalculation = `(
        SELECT COUNT(*)
        FROM V_CUSTOMERCODE cc_failed, V_SALE sale_failed, V_TERMINAL term_failed
        WHERE cc_failed.CUSTOMER = c.OBJID
        AND sale_failed.CUSTOMERCODE = cc_failed.OBJID
        AND term_failed.OBJID = sale_failed.TERMINAL
        AND term_failed.NAME = 'Automatic Recharge'
        AND sale_failed.STATUS = -9
        AND sale_failed.LOGDATE >= DATEADD(-7 DAY TO CURRENT_TIMESTAMP)
      )`;

      if (f.operator === "is greater than") {
        whereClauses.push(`${failedAttemptsCalculation} > ${targetCount}`);
        console.log("Added greater than condition");
      } else if (f.operator === "is less than") {
        whereClauses.push(`${failedAttemptsCalculation} < ${targetCount}`);
        console.log("Added less than condition");
      } else if (f.operator === "is greater than or equal to") {
        whereClauses.push(`${failedAttemptsCalculation} >= ${targetCount}`);
        console.log("Added greater than or equal condition");
      } else if (f.operator === "is less than or equal to") {
        whereClauses.push(`${failedAttemptsCalculation} <= ${targetCount}`);
        console.log("Added less than or equal condition");
      } else if (f.operator === "is") {
        whereClauses.push(`${failedAttemptsCalculation} = ${targetCount}`);
        console.log("Added equals condition");
      } else if (f.operator === "is not") {
        whereClauses.push(`${failedAttemptsCalculation} <> ${targetCount}`);
        console.log("Added not equals condition");
      }
      
      console.log("Current whereClauses:", whereClauses);
      return; // Skip the normal processing for this filter
    }

    // Special handling for membership cancellation date - find when plan was discontinued or terminated
    if (f.property === "Membership cancellation date") {
      console.log("Processing Membership cancellation date filter:", f);
      const days = Math.abs(Number(f.value)) || 0;
      console.log("Days:", days);
      
      // Status codes: 27=Discontinued, 29=Terminated
      if (f.operator === "is within last") {
        whereClauses.push(`EXISTS (
          SELECT 1 FROM V_SALEPASSES sp_cancel
          JOIN V_SALE sale_cancel ON sale_cancel.OBJID = sp_cancel.SALEID
          WHERE sp_cancel.CUSTOMER = c.OBJID
          AND sp_cancel.STATUS IN (27, 29)
          AND sale_cancel.LOGDATE >= DATEADD(-${days} DAY TO CURRENT_TIMESTAMP)
        )`);
        console.log("Added within last condition for cancellation date");
      } else if (f.operator === "is not within last") {
        whereClauses.push(`NOT EXISTS (
          SELECT 1 FROM V_SALEPASSES sp_cancel
          JOIN V_SALE sale_cancel ON sale_cancel.OBJID = sp_cancel.SALEID
          WHERE sp_cancel.CUSTOMER = c.OBJID
          AND sp_cancel.STATUS IN (27, 29)
          AND sale_cancel.LOGDATE >= DATEADD(-${days} DAY TO CURRENT_TIMESTAMP)
        )`);
        console.log("Added not within last condition for cancellation date");
      }
      
      console.log("Current whereClauses:", whereClauses);
      return; // Skip the normal processing for this filter
    }

    const def = filterDictionary[f.property];
    if (!def) return; // skip unknown

    const template = operatorTemplates[f.operator];
    if (!template) return;

    // Special handling for filters that can cause row multiplication
    if (f.property === "Last wash date") {
      // Use EXISTS subquery to avoid duplicates
      if (f.operator === "is within last") {
        const num = Math.abs(Number(f.value)) || 0;
        const unit = (f.timeUnit ?? "days").toUpperCase().replace(/S$/, "");
        whereClauses.push(`EXISTS (
          SELECT 1 FROM V_CUSTOMERCODE cc2 
          JOIN V_SALE sale2 ON sale2.CUSTOMERCODE = cc2.OBJID 
          JOIN V_TERMINAL term2 ON term2.OBJID = sale2.TERMINAL 
          WHERE cc2.CUSTOMER = c.OBJID 
          AND term2.NAME <> 'Automatic Recharge' 
          AND sale2.LOGDATE >= DATEADD(-${num} ${unit} TO CURRENT_TIMESTAMP)
        )`);
      } else if (f.operator === "is not within last") {
        const num = Math.abs(Number(f.value)) || 0;
        const unit = (f.timeUnit ?? "days").toUpperCase().replace(/S$/, "");
        whereClauses.push(`NOT EXISTS (
          SELECT 1 FROM V_CUSTOMERCODE cc2 
          JOIN V_SALE sale2 ON sale2.CUSTOMERCODE = cc2.OBJID 
          JOIN V_TERMINAL term2 ON term2.OBJID = sale2.TERMINAL 
          WHERE cc2.CUSTOMER = c.OBJID 
          AND term2.NAME <> 'Automatic Recharge' 
          AND sale2.LOGDATE >= DATEADD(-${num} ${unit} TO CURRENT_TIMESTAMP)
        )`);
      }
      return; // Skip the normal processing for this filter
    }

    // Special handling for first visit - find earliest visit date
    if (f.property === "First visit") {
      console.log("Processing First visit filter:", f);
      const days = Math.abs(Number(f.value)) || 0;
      console.log("Days:", days);
      
      if (f.operator === "is within last") {
        whereClauses.push(`EXISTS (
          SELECT 1 FROM V_CUSTOMERCODE cc_first
          JOIN V_SALE sale_first ON sale_first.CUSTOMERCODE = cc_first.OBJID
          JOIN V_TERMINAL term_first ON term_first.OBJID = sale_first.TERMINAL
          WHERE cc_first.CUSTOMER = c.OBJID
          AND term_first.NAME <> 'Automatic Recharge'
          AND sale_first.LOGDATE = (
            SELECT MIN(sale_min.LOGDATE)
            FROM V_CUSTOMERCODE cc_min
            JOIN V_SALE sale_min ON sale_min.CUSTOMERCODE = cc_min.OBJID
            JOIN V_TERMINAL term_min ON term_min.OBJID = sale_min.TERMINAL
            WHERE cc_min.CUSTOMER = c.OBJID
            AND term_min.NAME <> 'Automatic Recharge'
          )
          AND sale_first.LOGDATE >= DATEADD(-${days} DAY TO CURRENT_TIMESTAMP)
        )`);
        console.log("Added within last condition for first visit");
      } else if (f.operator === "is not within last") {
        whereClauses.push(`NOT EXISTS (
          SELECT 1 FROM V_CUSTOMERCODE cc_first
          JOIN V_SALE sale_first ON sale_first.CUSTOMERCODE = cc_first.OBJID
          JOIN V_TERMINAL term_first ON term_first.OBJID = sale_first.TERMINAL
          WHERE cc_first.CUSTOMER = c.OBJID
          AND term_first.NAME <> 'Automatic Recharge'
          AND sale_first.LOGDATE = (
            SELECT MIN(sale_min.LOGDATE)
            FROM V_CUSTOMERCODE cc_min
            JOIN V_SALE sale_min ON sale_min.CUSTOMERCODE = cc_min.OBJID
            JOIN V_TERMINAL term_min ON term_min.OBJID = sale_min.TERMINAL
            WHERE cc_min.CUSTOMER = c.OBJID
            AND term_min.NAME <> 'Automatic Recharge'
          )
          AND sale_first.LOGDATE >= DATEADD(-${days} DAY TO CURRENT_TIMESTAMP)
        )`);
        console.log("Added not within last condition for first visit");
      }
      
      console.log("Current whereClauses:", whereClauses);
      return; // Skip the normal processing for this filter
    }

    // Special handling for membership plan name to avoid multiple membership records
    if (f.property === "Membership plan name") {
      if (Array.isArray(f.value) && f.value.length > 0) {
        if (f.operator === "is") {
          const placeholders = f.value.map(() => "?").join(", ");
          whereClauses.push(`EXISTS (
            SELECT 1 FROM V_SALEPASSES sp2 
            JOIN V_PLANTYPE pt2 ON pt2.OBJID = sp2.PLANTYPE 
            WHERE sp2.CUSTOMER = c.OBJID 
            AND pt2.NAME IN (${placeholders})
          )`);
          params.push(...f.value);
        } else if (f.operator === "is not") {
          const placeholders = f.value.map(() => "?").join(", ");
          whereClauses.push(`NOT EXISTS (
            SELECT 1 FROM V_SALEPASSES sp2 
            JOIN V_PLANTYPE pt2 ON pt2.OBJID = sp2.PLANTYPE 
            WHERE sp2.CUSTOMER = c.OBJID 
            AND pt2.NAME IN (${placeholders})
          )`);
          params.push(...f.value);
        }
      } else if (!Array.isArray(f.value) && f.value) {
        // Single value
        if (f.operator === "is") {
          whereClauses.push(`EXISTS (
            SELECT 1 FROM V_SALEPASSES sp2 
            JOIN V_PLANTYPE pt2 ON pt2.OBJID = sp2.PLANTYPE 
            WHERE sp2.CUSTOMER = c.OBJID 
            AND pt2.NAME = ?
          )`);
          params.push(f.value);
        } else if (f.operator === "is not") {
          whereClauses.push(`NOT EXISTS (
            SELECT 1 FROM V_SALEPASSES sp2 
            JOIN V_PLANTYPE pt2 ON pt2.OBJID = sp2.PLANTYPE 
            WHERE sp2.CUSTOMER = c.OBJID 
            AND pt2.NAME = ?
          )`);
          params.push(f.value);
        }
      }
      return; // Skip the normal processing for this filter
    }

    // Special handling for membership join date to avoid multiple membership records
    if (f.property === "Membership join date") {
      if (f.operator === "is within last") {
        const num = Math.abs(Number(f.value)) || 0;
        const unit = (f.timeUnit ?? "days").toUpperCase().replace(/S$/, "");
        whereClauses.push(`EXISTS (
          SELECT 1 FROM V_SALEPASSES sp2 
          WHERE sp2.CUSTOMER = c.OBJID 
          AND sp2.MEMBERSINCE >= DATEADD(-${num} ${unit} TO CURRENT_TIMESTAMP)
        )`);
      } else if (f.operator === "is not within last") {
        const num = Math.abs(Number(f.value)) || 0;
        const unit = (f.timeUnit ?? "days").toUpperCase().replace(/S$/, "");
        whereClauses.push(`NOT EXISTS (
          SELECT 1 FROM V_SALEPASSES sp2 
          WHERE sp2.CUSTOMER = c.OBJID 
          AND sp2.MEMBERSINCE >= DATEADD(-${num} ${unit} TO CURRENT_TIMESTAMP)
        )`);
      }
      return; // Skip the normal processing for this filter
    }

    // Normal processing for other filters
    const tableRef = def.view === baseView ? baseAlias : def.alias ?? def.view;
    let expr = `${tableRef}.${def.column}`;

    // collect joins for non-subquery filters
    if (def.joins && def.joins.length) {
      def.joins.forEach((j) => joinSet.add(j));
    }

    if (f.operator === "is within last") {
      const num = Math.abs(Number(f.value)) || 0;
      const unit = (f.timeUnit ?? "days").toUpperCase().replace(/S$/, "");
      whereClauses.push(`${expr} >= DATEADD(-${num} ${unit} TO CURRENT_TIMESTAMP)`);
    } else {
      // Handle multiselect arrays
      if (Array.isArray(f.value) && f.value.length > 0) {
        if (f.operator === "is") {
          const placeholders = f.value.map(() => "?").join(", ");
          whereClauses.push(`${expr} IN (${placeholders})`);
          params.push(...f.value);
        } else if (f.operator === "is not") {
          const placeholders = f.value.map(() => "?").join(", ");
          whereClauses.push(`${expr} NOT IN (${placeholders})`);
          params.push(...f.value);
        } else {
          // For other operators with arrays, use the first value
          whereClauses.push(template.sql.replace("{expr}", expr));
          params.push(f.value[0]);
        }
      } else if (Array.isArray(f.value) && f.value.length === 0) {
        // Empty array - skip this filter
        return;
      } else {
        // Single value - use regular template
        whereClauses.push(template.sql.replace("{expr}", expr));
        params.push(f.value);
      }
    }
  });

  const where = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";
  const joins = Array.from(joinSet).join(" ");
  const sql = `SELECT FIRST 500 * FROM ${baseView} ${baseAlias} ${joins} ${where}`;

  return { sql, params, fromView: baseView };
} 