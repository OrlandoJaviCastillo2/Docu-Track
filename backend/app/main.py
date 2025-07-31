# Punto de entrada de FastAPI: creación de tablas, configuración CORS y registro de routers
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth.routes import auth_router
from app.certificados.routes import router as certificados_router
from app.admin.routes import admin_router
from app.database import Base, engine


# Generación de las tablas en la BD si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuración de CORS para permitir acceso a el frontend de Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hola desde FastAPI"}


# Conjunto de routers con sus prefixes correspondientes
app.include_router(auth_router, prefix="/auth")
app.include_router(admin_router, prefix="/admin")
app.include_router(certificados_router,  tags=["certificados"])
