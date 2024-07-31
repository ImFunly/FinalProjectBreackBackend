# CRUD DE TAREAS CON MONGOOSE

Esta es una aplicación sencilla en Node.js utilizando Express con mongoose para crear una API de tareas, donde podras crear, ver tareas, actulizar y borrarlas.

La estructura será la siguiente:
- config
  - config.js // Código de la conexión a la base de datos.
- env
  - .env // Aquí debe ir la MONGO_URI que nos da mongoDB Atlas
- models
  - Task.js // Aqui ira el modelo de la tarea con los campos title, completed y los timestamps.
- routes 
  - tasks.js // Aquí estarán todas las rutas
- index.js // Añadiremos nuestro servidor, conexión a la base de datos y uniremos el resto de la aplicación

## Endpoints de la API
- POST /create: Endpoint para crear una tarea.
- GET /: Endpoint para traer todas las tareas.
- GET /id/:_id: Endpoint para buscar tarea por id.
- PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada.
- PUT /id/:_id: Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. Es decir, que no me deje cambiar el campo  “completed” desde este endpoint, sino solo, el título.
- DELETE /id/:_id: Endpoint para eliminar una tarea.


1. Configuración
- Lo primero es inicializar nuestro proyecto de node
- Lo segundo es hacer npm install para instalar las dependencias de package.json
- Crearemos un servidor http con express en app.js

2. Paso a paso 
- Comenzaremos a manejar los módulos y solo introduciremos lo necesario en cada uno de ellos. No se debe requerir nada que no se vaya a usar.

3. POSTMAN
- Cada endpoint debe ser probado en postman y ver que funcione.

