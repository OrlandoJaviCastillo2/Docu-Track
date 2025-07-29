
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



El procedimiento para abrir el espacio virtual y el FastAPI se destacan a continuación, ambos pueden ser abiertos en una sola terminal:


cd C:\Docu-Track   Búsqueda del folder con el prototipo de aplicación



venv\Scripts\activate  Activación del espacio virtual


cd C:\Docu-Track\backend    Acceso al backend del prototipo

uvicorn app.main:app --reload     Activación de FastAPI, o backend del prototipo.


26/7/2025

Procedí con el desarrollo del backend, lo que incluye las conexiones a las bases de datos, los modelos de los registros, gran parte del middleware para los roles y la validación de los token. También se establecieron las solicitudes para los certificados, y las solicitudes por parte de los administradores. Se estableció también, por el lado del frontend, la estructura básica del sitio web y las rutas a utilizar, además del formulario para hacer login en el sitio web con las cookies.

Ya se puede activar el servidor, y ya se puede acceder al sutio web por medio de localhost3000, aunque de momento no tiene funcionalidad el sitio. Esto debería cambiar conforme adapto los elementos de frontend con los de backend ya existentes. A pesar de algunas dificultades con código molesto (algunas de las ayudas vistas pueden ser refinadas), entre las que se incluyen imports necesarios para el backend, lógicas de código mejorable, y otras dificultades similares. Tocará hacer algunas revisiones de backend, mientras que se van aplicando y ejecutando los nuevos conceptos de frontend.


cd C:\Docu-Track\frontend   Folder con los archivos frontend



npm run dev    activación del servidor     



http://localhost:3000  link del sitio web


27/7/2025

Hubo una cantidad considerable de dificultades en este día, principalmente en cuanto a el sistema de registro e inicio de sesión, así como con los sistemas de autenticación de el prototipo. Al parecer, gran parte de las dificultades se daba por la presencia de un segundo archivo main.py, el cual se encontraba fuera de el folder app, encontrado a su vez en la sección de backend. Debido a esta dificultad, se tuvieron que modificar varios importes en el archivo main, así como en los factores de autenticación dentro de los archivos routes, e incluso algunos cambios para abarcar otro problema con la tabla de usuarios, la cual al parecer no encontraba debido a la falta de un componente dentro de la misma.  Lo positivo de toda esta experiencia, es que al final, se logró establecer un sistema de registro e inicio de sesión, ya sea para un usuario regular o un administrador, por lo que lo siguiente sería el acceso a las ventanas de menú y operación a las que se quieren acceder.



