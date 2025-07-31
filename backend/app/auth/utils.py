from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from app.database import SessionLocal
from app import models
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
oauth2_scheme = HTTPBearer()



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "bolen"  
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES):               # Crea JWT con payload y expiración
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])                     # Decodifica el mencionado JWT y retorna los resultados o nada
        return payload
    except JWTError:
        return None
    

def get_db():                                                                                 #Busca la base de datos
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(                                                                             #Agarra al usuario actual
    credentials: HTTPAuthorizationCredentials = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    token = credentials.credentials
    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido")

    role = payload.get("role")
    user_id = payload.get("sub")
    email = payload.get("email")

    if role == "usuario":
        user = db.query(models.Usuario).filter(models.Usuario.id == int(user_id)).first()
    elif role == "administrador":
        user = db.query(models.Administrador).filter(models.Administrador.id == int(user_id)).first()
    else:
        raise HTTPException(status_code=403, detail="Rol no autorizado")

    if not user or user.email != email:
        raise HTTPException(status_code=401, detail="Token inválido")

    return {"user": user, "role": role}