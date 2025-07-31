# Script auxiliar para verificar la conexión a la base de datos PostgreSQL
# Se usa psycopg2 para conectarse y obtener la versión del servidor.
import psycopg2

try:
    conn = psycopg2.connect(
        dbname="docutrack_db",
        user="postgres",
        password="admin123",            # Intentos de conección con la BD usando psycopg2
        host="localhost",
        port="5432"
    )
    cur = conn.cursor()
    cur.execute("SELECT version();")           # Consulta simple para obtener la versión de PostgreSQL
    db_version = cur.fetchone()
    print("✅ Conexión exitosa. Versión de PostgreSQL:", db_version)    #Conexión Exitosa
    cur.close()
    conn.close()
except Exception as e:                                                  
    print(" Error al conectar con PostgreSQL:")             #Error de conexión
    print(e)
