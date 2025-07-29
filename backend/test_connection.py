import psycopg2

try:
    conn = psycopg2.connect(
        dbname="docutrack_db",
        user="postgres",
        password="admin123",
        host="localhost",
        port="5432"
    )
    cur = conn.cursor()
    cur.execute("SELECT version();")
    db_version = cur.fetchone()
    print("✅ Conexión exitosa. Versión de PostgreSQL:", db_version)
    cur.close()
    conn.close()
except Exception as e:
    print(" Error al conectar con PostgreSQL:")
    print(e)
