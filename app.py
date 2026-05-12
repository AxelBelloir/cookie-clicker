import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from psycopg2.pool import SimpleConnectionPool

# ================= CONFIG =================

DB_PARAMS = {
    "host": os.getenv("DB_HOST","pg-19661735-axelbelloir1-1784.h.aivencloud.com"),
    "dbname": os.getenv("DB_NAME","defaultdb"),
    "user": os.getenv("DB_USER","avnadmin"),
    "password": os.getenv("DB_PASSWORD","AVNS_n7s_p9ULUjV-n8a2rBk"),
    "port": int(os.getenv("DB_PORT", 27617)),
    "sslmode": "require"   # OBLIGATOIRE pour Aiven
}


# ================= POOL =================

pool = SimpleConnectionPool(
    minconn=1,
    maxconn=10,
    **DB_PARAMS
)

def get_conn():
    return pool.getconn()

def release_conn(conn):
    pool.putconn(conn)

# ================= INIT DATABASE =================

def init_db():
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("""
        CREATE TABLE IF NOT EXISTS save (
            nmbCook TEXT,
            cookForClick TEXT,
            nmbCookSec TEXT,
            displayCook TEXT,
            machine TEXT,
            skinNonDbloquer TEXT,
            SkinPosseder TEXT,
            IP TEXT
        );
        """)

        cur.execute("""
        CREATE INDEX IF NOT EXISTS idx_save_IP
        ON save(IP);
        """)

        conn.commit()
        print("✅ Base de données initialisée (tables + index)")

    except Exception as e:
        print("❌ Erreur init DB :", e)
    finally:
        release_conn(conn)
init_db()









# =============== FLASK ===============

app = Flask(__name__)
CORS(app)

@app.route("/api/save", methods=["POST"])

def save():
    data = request.get_json()
    nmbCook = data["nmbCook"]
    cookForClick = data["cookForClick"]
    nmbCookSec = data["nmbCookSec"]
    displayCook = data["displayCook"]
    machine = data["machine"]
    skinNonDbloquer = data["skinNonDbloquer"]
    SkinPosseder = data["SkinPosseder"]
    IP = data["IP"]
@app.route("/api/load", methods=["POST"])

def load():
    return jsonify({message : "rien"})
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
