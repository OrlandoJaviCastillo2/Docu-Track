from app import models, schemas
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import SolicitudCreate, SolicitudResponse, SolicitudUpdate
from app.models import SolicitudCertificado
from app.auth.utils import get_db, get_current_user
from typing import List

router = APIRouter()

@router.post("/", response_model=SolicitudResponse)
def crear_solicitud_certificado(db: Session, solicitud: schemas.SolicitudCreate, usuario_id: int):
    nueva_solicitud = models.SolicitudCertificado(
        nombre=solicitud.nombre,
        apellido=solicitud.apellido,
        cedula=solicitud.cedula,
        fecha_nacimiento=solicitud.fecha_nacimiento,
        usuario_id=usuario_id,
    )
    db.add(nueva_solicitud)
    db.commit()
    db.refresh(nueva_solicitud)
    return nueva_solicitud


@router.get("/", response_model=List[SolicitudResponse])
def listar_solicitudes_usuario(
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_current_user)
):
    if user_data["role"] != "usuario":
        raise HTTPException(status_code=403, detail="No autorizado")
    return db.query(SolicitudCertificado).filter_by(usuario_id=user_data["user"].id).all()

@router.put("/{solicitud_id}", response_model=SolicitudResponse)
def actualizar_solicitud(
    solicitud_id: int,
    payload: SolicitudUpdate,
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_current_user)
):
    solicitud = db.query(SolicitudCertificado).filter_by(id=solicitud_id, usuario_id=user_data["user"].id).first()
    if not solicitud:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")

    for attr, value in payload.dict().items():
        setattr(solicitud, attr, value)
    db.commit()
    db.refresh(solicitud)
    return solicitud
