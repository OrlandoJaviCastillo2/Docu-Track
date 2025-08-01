from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app import models
from .utils import decode_access_token
from app.database import SessionLocal

oauth2_scheme = HTTPBearer()                                         # Decodifica el JWT(JSON web Tokens), valida roles y obtiene la instancia de user/admin

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    token = credentials.credentials
    data = decode_access_token(token)
    if not data:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")

    role = data.get("role")
    user_id = data.get("sub")
    email = data.get("email")

    if role == "usuario":
        user = db.query(models.Usuario).filter(models.Usuario.id == int(user_id)).first()
    elif role == "administrador":
        user = db.query(models.Administrador).filter(models.Administrador.id == int(user_id)).first()
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Rol inválido")

    if not user or user.email != email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no encontrado")

    return {"user": user, "role": role}
