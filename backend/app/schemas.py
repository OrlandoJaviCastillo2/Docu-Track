# Modelos Pydantic para validación de datos de entrada/salida
from pydantic import BaseModel, EmailStr, Field
from typing import Literal
from datetime import date

class RegistroRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: Literal["usuario", "administrador"]

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class SolicitudCreate(BaseModel):
    first_name: str = Field(..., min_length=1)
    last_name: str = Field(..., min_length=1)
    identity_number: str = Field(..., pattern=r'^[0-9\-]+$')
    birth_date: date

class SolicitudResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    identity_number: str
    birth_date: date
    status: str
    identity_number_uuid: str

    class Config:
        orm_mode = True


class StatusUpdate(BaseModel):
    status: Literal["Recibido", "En validación", "Rechazado", "Emitido"]

class UserOut(BaseModel):
    id: int
    email: EmailStr
    role: str
    class Config:
        orm_mode = True

class UserTokenData(BaseModel):
    user_id: int
    role: Literal["usuario", "administrador"]


