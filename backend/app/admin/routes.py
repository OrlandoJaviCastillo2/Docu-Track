from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.auth.utils import get_current_user, get_db

admin_router = APIRouter()

@admin_router.get("/ping")
def ping():
    return {"message": "admin module OK"}




@admin_router.get("/solicitudes", response_model=List[schemas.SolicitudResponse])
def admin_listar(ctx=Depends(get_current_user), db: Session = Depends(get_db)):
    if ctx["role"] != "administrador":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return db.query(models.SolicitudCertificado).all()

@admin_router.patch("/solicitudes/{sol_id}", response_model=schemas.SolicitudResponse)
def cambiar_estado(sol_id: int, payload: schemas.StatusUpdate, ctx=Depends(get_current_user), db: Session = Depends(get_db)):
    if ctx["role"] != "administrador":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    sol = db.query(models.SolicitudCertificado).filter_by(id=sol_id).first()
    if not sol:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    sol.status = payload.status
    db.commit()
    db.refresh(sol)
    return sol


