# Configuración de SQLAlchemy dedicado al motor, sesión y base dde datos
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from fastapi import Depends

DATABASE_URL = "postgresql://postgres:admin123@localhost:5432/docutrack_db"   # URL de conexión a PostgreSQL

engine = create_engine(DATABASE_URL)                                           # Creación del engine y la fábrica de sesiones
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

def get_db():                                # Dependencia de FastAPI que proporciona una sesión por petición
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

