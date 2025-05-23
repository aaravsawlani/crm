import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import Firebird from "node-firebird";
import { buildQuery, FilterInput } from "@/lib/segmentation/queryBuilder";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const options = {
  host: "74.101.57.19",
  port: 3050,
  database: "C:/SiteWatch/DB/SiteWatch.FDB",
  user: "REPORTS",
  password: "V4Jp3mM1PrR57Z6",
  role: undefined,
  pageSize: 4096,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const filters: FilterInput[] = body.filters ?? [];

    console.log("Received filters:", JSON.stringify(filters, null, 2));
    
    const { sql, params } = buildQuery(filters);
    
    console.log("Generated SQL:", sql);
    console.log("Parameters:", params);

    return new Promise<NextResponse>((resolve) => {
      Firebird.attach(options, (err: any, db: any) => {
        if (err) {
          console.error("Firebird connection error:", err);
          resolve(NextResponse.json({ 
            success: false, 
            error: `Connection failed: ${err.message}`,
            sql: sql,
            params: params
          }));
          return;
        }

        db.query(sql, params, (err: any, result: any) => {
          if (err) {
            console.error("Query error:", err);
            db.detach();
            resolve(NextResponse.json({ 
              success: false, 
              error: `Query failed: ${err.message}`,
              sql: sql,
              params: params
            }));
            return;
          }

          db.detach();
          resolve(NextResponse.json({
            success: true,
            rows: result || [],
            rowCount: result?.length || 0,
            sql: sql,
            params: params
          }));
        });
      });
    });
  } catch (error: any) {
    console.error("Preview error:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
} 