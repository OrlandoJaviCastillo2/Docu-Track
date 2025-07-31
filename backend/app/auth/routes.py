from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import schemas, models
from app.auth.utils import get_password_hash
from app.schemas import UserOut
from app.auth.utils import get_current_user


from fastapi.security import OAuth2PasswordRequestForm

auth_router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

   ##Endpoint para registro    

@auth_router.post("/register", response_model=schemas.UserOut)
def register_user(payload: schemas.RegistroRequest, db: Session = Depends(get_db)):
    existing_user = (
        db.query(models.Usuario)                                                                     # Crea novo usuario con hash de contraseña
        .filter(models.Usuario.email == payload.email)
        .first()
    )
    if existing_user:
        raise HTTPException(status_code=400, detail="Correo ya registrado")

    hashed_password = get_password_hash(payload.password)  
    new_user = models.Usuario(
        email=payload.email,
        password_hash=hashed_password,
        full_name=payload.full_name,
        role=payload.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user  

##Endpoint para verificación

from app.auth.utils import verify_password, create_access_token
from fastapi.responses import JSONResponse

@auth_router.post("/login")
def login_user(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.email == payload.email).first()                        # Verifica las credenciales y retorna JWT más los datos del usuario
    admin = db.query(models.Administrador).filter(models.Administrador.email == payload.email).first()

    user = usuario or admin
    role = "usuario" if usuario else "administrador" if admin else None

    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token = create_access_token({
        "sub": str(user.id),
        "email": user.email,
        "role": role
    })

    return JSONResponse(content={
        "access_token": token,
        "token_type": "bearer",
        "role": role,
        "user_id": user.id
    })


@auth_router.get("/me", response_model=UserOut)
def get_me(
    current_user_data: dict = Depends(get_current_user)                 # Retorna id, email y role del usuario actual
):
   
    user = current_user_data["user"]
    role = current_user_data["role"]
    
    return {
        "id": user.id,
        "email": user.email,
        "role": role
    }