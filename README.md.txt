README.md

24/7/2025
Saludos a todos, mi nombre es Orlando Javier Castillo. El propósito de este archivo README consiste en la documentación y comentario enfocado en la prueba técnica para la organización Edupan, con el enfoque en el puesto de Fullstack Developer. El objetivo de esta prueba técnica consiste en confeccionar un prototipo funcional para un servicio conocido como DocuTrack, el cual consiste en una aplicación web diseñada para optimizar procedimientos enfocados en la burocracia y manejo de trámites. El objetivo principal consiste en que cualquier usuario pueda solicitar un certificado según su procedimiento, para poder después descargarlo en formato PDF.

Para este caso, se va a necesitar el uso de herramientas fronten, backend, y base de datos requerida, con la alternativa de un despliegue final en otras soluciones. Primero que nada, estableceremos y prepararemos las herramientas a utilizar.

Para el frontend, usaré la tecnología de Next.js, dado que, según mis investigaciones, es mejor para aplicaciones mas especializadas.

Para el backend, FastAPI(Python), dado que recientemente estoy haciendo cursos en Python, por lo que es el lenguaje cn el que estoy más familiarizado de momento.

Y para la base de datos, PostgreSQL, ya esta establecido en las instrucciones que se debe utilizar para este proyecto.

Cabe destacar que, a la hora de establecer los fólderes principales del proyecto, hay que tener cuidado con elegir la carpeta correcta, dado que la solución de Fast(API) cuenta con componentes que necesitan ingresarse en la carpeta madre específica.



25/7/2025

Procedí el día de hoy con el denominado backend del proyecto, o los componentes que conformarían la arquitectura de la aplicación, en conjunto con otras partes y herramientas. Es aquí donde empezaría con los conceptos mas reconocidos por mi persona de la universidad, siendo estos la confección de bases de datos, utilizando el programa PostgreSQL para construir 3 tablas específicas: la tabla para usuarios de la aplicación, la tabla para los administradores, y la tabla para los certificados y sus datos.

La idea es que ambos usuarios y administradores puedan registrarse en el sistema, además de que los usuarios pudieran hacer su registros, mientras que los admins se enfocaran en aprobar los trámites. 

Con la base de datos establecida, entro al backend como tal usando FastAPI. Logré establecer las carpetas principales que formarían la estructura del proyecto, a la vez de que pude establecer también el entorno virtual de venv para el funcionamiento de la aplicación, todo esto con una combinación de Visual Studio para los elementos de Python, y el cmd para el entorno virtual. Con el entorno virtual operativo, se instalarían las dependencias necesarias para el funcionamiento del . Hubo fuertes dificultades con el formateo de algunas dependencias, ya que a la hora de configurar la base de datos, no me reconocía algunos elementos importantes, y me denotaba errores de conexión. Una vez superado este obstáculo, procedí a crear modelos de SQLAlchemy para definir las tablas como clases Python. Finalmente llegue a el arreglo del archivo main para desplegar el FastAPI, sin embargo, algunas de las dependencias no son legibles debido a un problema de codificación UTF-8, el cual según mi investigación, encontró caracteres que no encajan con el formato deseado. 


CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    contraseña TEXT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);





CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    contraseña TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE certificate_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    cédula VARCHAR(30) NOT NULL CHECK (cédula ~ '^[0-9\-]+$'),
    fecha_naci DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Recibido' CHECK (
        status IN ('Recibido', 'En validación', 'Rechazado', 'Emitido')
    ),
    file_path TEXT,  -- Ruta a la descarga o impresión en PDF si el estado es 'Emitido'
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



password: admin123


cd C:\Docu-Track



venv\Scripts\activate  Activación del espacio virtual


cd C:\Docu-Track\backend

uvicorn app.main:app --reload



26/7/2025

Procedí con el desarrollo del backend, lo que incluye las conexiones a las bases de datos, los modelos de los registros, gran parte del middleware para los roles y la validación de los token. También se establecieron las solicitudes para los certificados, y las solicitudes por parte de los administradores. Se estableció también, por el lado del frontend, la estructura básica del sitio web y las rutas a utilizar, además del formulario para hacer login en el sitio web con las cookies.

Ya se puede activar el servidor, y ya se puede acceder al sutio web por medio de localhost3000, aunque de momento no tiene funcionalidad el sitio. Esto debería cambiar conforme adapto los elementos de frontend con los de backend ya existentes. A pesar de algunas dificultades con código molesto (algunas de las ayudas vistas pueden ser refinadas), entre las que se incluyen imports necesarios para el backend, lógicas de código mejorable, y otras dificultades similares. Tocará hacer algunas revisiones de backend, mientras que se van aplicando y ejecutando los nuevos conceptos de frontend.


cd C:\Docu-Track\frontend



npm run dev    activación el servidor



http://localhost:3000  link del sitio web











27/7/2025

Hubo una cantidad considerable de dificultades en este día, principalmente en cuanto a el sistema de registro e inicio de sesión, así como con los sistemas de autenticación de el prototipo. Al parecer, gran parte de las dificultades se daba por la presencia de un segundo archivo main.py, el cual se encontraba fuera de el folder app, encontrado a su vez en la sección de backend. Debido a esta dificultad, se tuvieron que modificar varios importes en el archivo main, así como en los factores de autenticación dentro de los archivos routes, e incluso algunos cambios para abarcar otro problema con la tabla de usuarios, la cual al parecer no encontraba debido a la falta de un componente dentro de la misma.  Lo positivo de toda esta experiencia, es que al final, se logró establecer un sistema de registro e inicio de sesión, ya sea para un usuario regular o un administrador, por lo que lo siguiente sería el acceso a las ventanas de menú y operación a las que se quieren acceder.








28/7/2025
No se pudo avanzar con solicitud de certificado, muchas dificultades. Al parecer hubo varios errores relacionados con la conexión entre el sistema de solicitud para certificados, y la base de datos en sí, a la vez que hay otros problemas de autenticación en cuanto a los tokens, y al sitio web en sí. Para resolver estas dificultades, o al menos intentar resolver estos problemas, se hicieron cambios a las bases de datos para usuarios y las solicitudes en si, principalmente enfocándose en cambiar los nombres de las columnas en inglés, para una mejor cohesión y rastreo de los datos por medio de las diferentes plataformas, aunque esto trajo su propio conjunto de dificultades y problemas. También se notó que la página accedida por el usuario y el admin son en esenca la misma, cuando ese no debería ser el caso, algo que se esta procediendo a arreglar también. Este proyecto ha logrado demostrar ser un poco mas complicado de lo esperado, en especial con mi falta de maestría con las herramientas de Next.js y FastAPI. Por ellado positivo, tengo ya 2 ejemplos de usuario y admin respectivamente, los cuales se presentan a continuación:






admin
{
  "email": "orlandojaviercastillo@gmail.com",
  "password": "5757"
}


user
{
  "email": "palosos75@gmail.com",
  "password": "6767"
}



29/7/2025

Buenas noticias, después  mucho trabajo y muchos arreglos, logré  arreglar el problema con el ingreso de los certificados. El arreglo al final involucró el cambio y conexión de nombres con otras variables, a la vez de que se agregaron nuevos elementos, en la forma de archivos llamados layout.tsx para las páginas de admin y usuario centrales, así como las páginas dedicadas a brindar la autorización para los usuarios que ingresaran sus parámetros correctos. Con todo esto dicho, todavía tengo que revisar unas dificultades con la página de seguimiento para los certificados. También pude resolver otras dificultades con mi cuenta de GitHub, dado que había tenido problemas con el ingreso de commits para mi historial de reportes en cuanto al desarrollo de la aplicación. Pero eso ya esta resuelto, y aunque algunos commits estén fuera de la fecha puesta, todos los reportes escritos fueron detallados en su fecha designada. A continuación, los datos del certificado que fueron insertados exitosamente:



{
  "first_name": "Palos",
  "last_name": "Tirador",
  "identity_number": "6-77-888",
  "birth_date": "2025-07-01"
}







30/7/2025

Ya para el último día de desarrollo, he llegado oficialmente a mi fecha límite, y me temo que, a pesar de contar con una estructura compacta, y con un prototipo capaz de guardar usuarios, sus contraseñas, autenticarlas, y el poder registrar certificados con sus datos, no pude lograr ejecutar los componentes de verificación, revisión, e impresión para los mismos. Al final, demasiadas discrepancias entre los diferentes archivos, y mi falta de experiencia con las herramientas empleadas tomaron su cuenta, y se me acabó el tiempo. Sin embargo, puedo decir que, además de aprender mas a fondo sobre los programas como FastAPI y Next.js, los cuales me parecieron muy interesantes e intuitivos, además de refinar mis conocimientos en cuanto a manejo de bases de datos y el análisis de los mismos. Al final, puedo concluir de que esta prueba valió la pena intentar lograrla, a pesar de encontrarme fuera de mi elemento central, y rectifica mi posición de que en el campo de la tecnología, uno siempre tiene que expandir sus horizontes, a pesar de que estos a veces choquen con sus especialidades. Mis sugerencias para cualquiera que trate de ejecutar una operación similar:

-Asegúrense de tener el espacio adecuado en su equipo para el trabajo.

-Planificación detallada de las bases de datos es importante.

-Mientras mas investigues y refines tu sintaxis, mejor.

-Familiarízate con tu lógica, y como esta se refleja en tu proyecto.

-No dudes en buscar ayuda en el Internet, nos pasa a todos, especialmente si estas indagando en software nuevo para ti.


Doy las gracias al equipo de EduPan por permitirme esta oportunidad de ponerme a prueba como profesional (aunque fuera de mi especialidad fija) y me mantengo al tanto por cualquier retroalimentación.






class SolicitudResponse(BaseModel):
    id: int
    usuario_id: int
    first_name: str
    last_name: str
    identity_number: str
    birth_date: date
    status: Literal["Recibido","En validación","Rechazado","Emitido"]
    requested_at: Optional[str]
    class Config:
        orm_mode = True



class SolicitudResponse(BaseModel):
    id: int
    nombre: str
    apellido: str
    cedula: str
    fecha_nacimiento: date
    estado: str
    numero_identidad: str

    class Config:
        orm_mode = True







'use client'

import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function SolicitudCertificado() {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [cedula, setCedula] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async () => {
    try {
      const token = Cookies.get('token')
      const response = await axios.post(
        'http://localhost:8000/certificados/solicitud',
        {
          nombre,
          apellido,
          cedula,
          fecha_nacimiento: fechaNacimiento,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setMensaje('✅ Solicitud enviada correctamente')
    } catch (error) {
      setMensaje('❌ Error al enviar la solicitud')
      console.error(error)
    }
  }

  return (
    <main className="max-w-md mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Solicitud de Certificado</h1>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Cédula"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        placeholder="Fecha de Nacimiento"
        value={fechaNacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Enviar Solicitud
      </button>

      {mensaje && <p className="text-sm mt-2">{mensaje}</p>}
    </main>
  )
}

