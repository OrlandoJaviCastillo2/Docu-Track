from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import SolicitudCertificado
from app.schemas import SolicitudCreate, SolicitudResponse
from app.auth.get_current_user import get_current_user
import uuid

router = APIRouter()

@router.post("/crear", response_model=SolicitudResponse)
def crear_solicitud(
    solicitud: SolicitudCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    try:
        solicitud_uuid = str(uuid.uuid4())

        nueva_solicitud = SolicitudCertificado(
            first_name=solicitud.first_name,
            last_name=solicitud.last_name,
            identity_number=solicitud.identity_number,
            birth_date=solicitud.birth_date,
            status="pendiente",
            identity_number_uuid=solicitud_uuid,
            user_id=current_user.get("id"),
        )

        db.add(nueva_solicitud)
        db.commit()
        db.refresh(nueva_solicitud)
        return nueva_solicitud
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

