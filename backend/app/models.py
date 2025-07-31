# Definición de tablas con SQLAlchemy ORM
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text, TIMESTAMP, CheckConstraint, DateTime, func
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    role = Column(String)  

    certificados = relationship("SolicitudCertificado", back_populates="usuario")    # Relación 1:N con las solicitudes


class Administrador(Base):
    __tablename__ = "administradores"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, server_default="now()")


class SolicitudCertificado(Base):
    __tablename__ = "solicitud_certificados"

    id = Column(Integer, primary_key=True, index=True)                             # PK de la solicitud
    user_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"))
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    identity_number = Column(String(30), nullable=False)
    identity_number_uuid = Column(String(36), unique=True, nullable=False)
    birth_date = Column(Date, nullable=False)
    status = Column(String(20), nullable=False, default="Recibido")                       # Estado de la solicitud
    file_path = Column(Text)                                                            # Ruta del PDF para solicitud emitida
    requested_at = Column(TIMESTAMP, server_default="now()")                             # Tiempo de solicitud
                             
    __table_args__ = (
        CheckConstraint("identity_number ~ '^[0-9\\-]+$'", name="identity_number_format"),               # Validación de formato de cédula
        CheckConstraint("status IN ('pendiente','Recibido', 'En validación', 'Rechazado', 'Emitido')", name="valid_status"),
    )

    usuario = relationship("Usuario", back_populates="certificados")
