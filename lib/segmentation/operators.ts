export type OperatorKey =
  | "is"
  | "is not"
  | "is greater than"
  | "is less than"
  | "is greater than or equal to"
  | "is less than or equal to"
  | "contains"
  | "does not contain"
  | "is before"
  | "is after"
  | "is on"
  | "is within last"
  | "is not within last";

interface Template {
  sql: string; // contains {expr} placeholder and maybe ? for parameter(s)
  paramCount: number | "dynamic"; // number of parameters, or dynamic for IN
}

export const operatorTemplates: Record<OperatorKey, Template> = {
  "is": { sql: "{expr} = ?", paramCount: 1 },
  "is not": { sql: "{expr} <> ?", paramCount: 1 },
  "is greater than": { sql: "{expr} > ?", paramCount: 1 },
  "is less than": { sql: "{expr} < ?", paramCount: 1 },
  "is greater than or equal to": { sql: "{expr} >= ?", paramCount: 1 },
  "is less than or equal to": { sql: "{expr} <= ?", paramCount: 1 },
  "contains": { sql: "{expr} CONTAINING ?", paramCount: 1 }, // Firebird case-insensitive search
  "does not contain": { sql: "NOT ({expr} CONTAINING ?)", paramCount: 1 },
  "is before": { sql: "{expr} < ?", paramCount: 1 },
  "is after": { sql: "{expr} > ?", paramCount: 1 },
  "is on": { sql: "CAST({expr} AS DATE) = ?", paramCount: 1 },
  "is within last": {
    sql: "{expr} >= DATEADD(? ? TO CURRENT_DATE)", // will replace first ? with negative number and second ? with unit (DAY/MONTH)
    paramCount: 2,
  },
  "is not within last": {
    sql: "{expr} < DATEADD(? ? TO CURRENT_DATE)", // will replace first ? with negative number and second ? with unit (DAY/MONTH)
    paramCount: 2,
  },
}; 