import pyodbc
import traceback

# -------------------------------------------------------------------
# Connection string — credentials and paths as provided
# -------------------------------------------------------------------
conn_str = (
    "DRIVER=Firebird/InterBase(r) driver;"
    r"DBNAME=74.101.57.19/3050:C:\SiteWatch\DB\SiteWatch.FDB;"
    "UID=REPORTS;"
    "PWD=V4Jp3mM1PrR57Z6;"
    "CHARSET=UTF8;"
    "DIALECT=3;"
    r"CLIENT=C:\Program Files\Firebird\Firebird_2_5\bin\fbclient.dll;"
)

# -------------------------------------------------------------------
# Query: first 10 rows from V_CUSTOMER, ordered by LastName descending
# -------------------------------------------------------------------
try:
    with pyodbc.connect(conn_str, timeout=10) as cnxn:
        with cnxn.cursor() as cur:
            cur.execute("""
                SELECT FIRST 1 *
                FROM   V_CUSTOMER
                ORDER  BY LastName DESC
            """)
            for row in cur.fetchall():
                print(row)

except pyodbc.Error as e:
    print("ODBC error:", e)
    traceback.print_exc()
