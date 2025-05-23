import { NextResponse } from "next/server";
// @ts-ignore — node-firebird doesn't ship TypeScript types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Firebird from "node-firebird";

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

export async function GET() {
  return new Promise<NextResponse>((resolve) => {
    Firebird.attach(options, (err: any, db: any) => {
      if (err) {
        resolve(NextResponse.json({ success: false, error: err.message }, { status: 500 }));
        return;
      }

      (db as any).query(
        `SELECT FIRST 10 * FROM V_CUSTOMER ORDER BY LastName DESC`,
        (qErr: any, result: any[]) => {
          if (qErr) {
            (db as any).detach();
            resolve(NextResponse.json({ success: false, error: qErr.message }, { status: 500 }));
            return;
          }

          if (!result || result.length === 0) {
            console.warn("Firebird query returned 0 rows.");
            resolve(NextResponse.json({ success: true, rows: [], info: "Query executed but returned 0 rows." }));
            return;
          }

          (db as any).detach();
          resolve(NextResponse.json({ success: true, rows: result }));
        }
      );
    });
  });
} 