# Alternativa para la gestión de certificados con router prefijado en "/certificados".
# Combinación de los endpoints de creación, listado y actualización de status.
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid
from app import models
from app.schemas import SolicitudCreate, SolicitudResponse, StatusUpdate
from app.models import SolicitudCertificado
from app.auth.utils import get_db, get_current_user
from app.auth.get_current_user import get_current_user

router = APIRouter(prefix="/certificados", tags=["certificados"])

@router.post("/", response_model=SolicitudResponse)                # Similar a routes.py/create, pero recibe datos con Depends en lugar de Pydantic directo.
def crear_solicitud_certificado(
    db: Session = Depends(get_db),
    solicitud: SolicitudCreate = Depends(),
    user_data: dict = Depends(get_current_user)
):
    usuario = user_data["user"]
    nueva_solicitud = models.SolicitudCertificado(
        first_name=solicitud.first_name,
        last_name=solicitud.last_name,
        identity_number=solicitud.identity_number,
        birth_date=solicitud.birth_date,
        status="pendiente",
        identity_number_uuid=str(uuid.uuid4()),
        user_id=usuario.id,
    )
    db.add(nueva_solicitud)
    db.commit()
    db.refresh(nueva_solicitud)
    return nueva_solicitud

@router.get("/mis_solicitudes", response_model=List[SolicitudResponse])            # Devuelve las solicitudes del usuario actual usando el usuario actual, o current_user["user"].
def listar_mis_solicitudes(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # Extraemos primero la entidad user que devuelve get_current_user
    usuario = current_user["user"]
    return (
        db.query(SolicitudCertificado)
          .filter_by(user_id=usuario.id)
          .all()
    )

@router.patch("/{solicitud_id}", response_model=SolicitudResponse)                      # Permite al usuario actualizar el estado de su solicitud
def actualizar_solicitud(
    solicitud_id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_current_user)
):
    usuario = user_data["user"]
    sol = (
        db.query(SolicitudCertificado)
          .filter_by(id=solicitud_id, user_id=usuario.id)
          .first()
    )
    if not sol:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")

                                                                                                   # Aplica el único campo permitido en StatusUpdate
    sol.status = payload.status
    db.commit()
    db.refresh(sol)
    return sol
