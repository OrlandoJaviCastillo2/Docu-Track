# Define el router de certificados sin prefijos locales (momontados en el archivo main.py).
# Importa los modelos, esquemas y la dependencia de usuario autenticado.
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid
from app.database import get_db
from app.models import SolicitudCertificado
from app.schemas import SolicitudCreate, SolicitudResponse
from app.auth.get_current_user import get_current_user


router = APIRouter(tags=["certificados"])

@router.post("/crear", response_model=SolicitudResponse)        # Crea una nueva solicitud asociada al user id extraído de la variable current_user["user"].        
def crear_solicitud(                                                # Genera UUID(Identificador Único Universal) para el número de identidad uuid y guarda en DB.
    solicitud: SolicitudCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    try:
        solicitud_uuid = str(uuid.uuid4())
        usuario = current_user["user"]
        nueva_solicitud = SolicitudCertificado(
            first_name=solicitud.first_name,
            last_name=solicitud.last_name,
            identity_number=solicitud.identity_number,
            birth_date=solicitud.birth_date,
            status="pendiente",
            identity_number_uuid=solicitud_uuid,
            user_id=usuario.id,
        )
        db.add(nueva_solicitud)
        db.commit()
        db.refresh(nueva_solicitud)
        return nueva_solicitud
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/mis_solicitudes", response_model=List[SolicitudResponse])           # Lista dedicada a  las solicitudes del usuario autenticado (filtrado por uidentidad del usuario).
def listar_mis_solicitudes(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    usuario = current_user["user"]
    return (
        db.query(SolicitudCertificado)
          .filter_by(user_id=usuario.id)
          .all()
    )
