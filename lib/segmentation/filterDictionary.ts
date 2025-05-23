export type FieldType = "TEXT" | "NUMBER" | "DATE" | "BOOLEAN";

export interface FilterDefinition {
  label: string; // UI label
  view: string;  // Firebird view name
  column: string; // column in that view
  type: FieldType;
  alias?: string; // optional table alias to use in joins
  joins?: string[]; // join clauses required for this field
}

// Map by label for quick lookup
export const filterDictionary: Record<string, FilterDefinition> = {
  // --- Membership fields ---
  "Last wash date": {
    label: "Last wash date",
    view: "sale",
    alias: "sale",
    column: "LOGDATE", // last wash derived from V_SALE.LogDate
    type: "DATE",
    joins: [
      "JOIN V_CUSTOMERCODE cc ON cc.CUSTOMER = c.OBJID",
      "JOIN V_SALE sale ON sale.CUSTOMERCODE = cc.OBJID",
      "JOIN V_TERMINAL term ON term.OBJID = sale.TERMINAL",
    ],
  },

  "First visit": {
    label: "First visit",
    view: "c", // placeholder - handled specially in queryBuilder
    alias: "c",
    column: "OBJID", // placeholder - handled specially in queryBuilder
    type: "DATE",
    joins: [], // no joins needed - handled specially
  },

  "Average visits": {
    label: "Average visits",
    view: "c", // placeholder - handled specially in queryBuilder
    alias: "c",
    column: "OBJID", // placeholder - handled specially in queryBuilder
    type: "NUMBER",
    joins: [], // no joins needed - handled specially
  },

  "Recent visits": {
    label: "Recent visits",
    view: "c", // placeholder - handled specially in queryBuilder
    alias: "c", 
    column: "OBJID", // placeholder - handled specially in queryBuilder
    type: "NUMBER",
    joins: [], // no joins needed - handled specially
  },

  "Total visits": {
    label: "Total visits",
    view: "c", // placeholder - handled specially in queryBuilder
    alias: "c",
    column: "OBJID", // placeholder - handled specially in queryBuilder
    type: "NUMBER", 
    joins: [], // no joins needed - handled specially
  },

  "Is a member": {
    label: "Is a member",
    view: "c", // placeholder - handled specially in queryBuilder
    alias: "c",
    column: "OBJID", // placeholder - handled specially in queryBuilder
    type: "BOOLEAN",
    joins: [], // no joins needed - handled specially
  },

  "Membership status": {
    label: "Membership status",
    view: "c", // placeholder - handled specially in queryBuilder
    alias: "c",
    column: "OBJID", // placeholder - handled specially in queryBuilder
    type: "TEXT",
    joins: [], // no joins needed - handled specially
  },

  "Membership last charge date": {
    label: "Membership last charge date",
    view: "c", // placeholder - handled specially in queryBuilder
    alias: "c",
    column: "OBJID", // placeholder - handled specially in queryBuilder
    type: "DATE",
    joins: [], // no joins needed - handled specially
  },

  "Membership failed recharge attempts": {
    label: "Membership failed recharge attempts",
    view: "c", // placeholder - handled specially in queryBuilder
    alias: "c",
    column: "OBJID", // placeholder - handled specially in queryBuilder
    type: "NUMBER",
    joins: [], // no joins needed - handled specially
  },

  "Membership cancellation date": {
    label: "Membership cancellation date",
    view: "c", // placeholder - handled specially in queryBuilder
    alias: "c",
    column: "OBJID", // placeholder - handled specially in queryBuilder
    type: "DATE",
    joins: [], // no joins needed - handled specially
  },

  "Membership plan name": {
    label: "Membership plan name",
    view: "pt",
    alias: "pt",
    column: "NAME",
    type: "TEXT",
    joins: [
      "JOIN V_SALEPASSES sp ON sp.CUSTOMER = c.OBJID",
      "JOIN V_PLANTYPE pt ON pt.OBJID = sp.PLANTYPE",
    ],
  },

  "Membership join date": {
    label: "Membership join date",
    view: "sp",
    alias: "sp",
    column: "MEMBERSINCE",
    type: "DATE",
    joins: [
      "JOIN V_SALEPASSES sp ON sp.CUSTOMER = c.OBJID",
    ],
  },

  // duplicate key for compatibility with UI label
  "Membership last wash date": {
    label: "Last wash date",
    view: "sale",
    alias: "sale",
    column: "LOGDATE",
    type: "DATE",
    joins: [
      "JOIN V_CUSTOMERCODE cc ON cc.CUSTOMER = c.OBJID",
      "JOIN V_SALE sale ON sale.CUSTOMERCODE = cc.OBJID",
    ],
  },
}; 