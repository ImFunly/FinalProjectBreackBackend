const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/config'); 
const routes = require('./routes/user');
const pet = require('./routes/pet');
const order = require('./routes/order');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', routes);

app.use('/pet', pet);

app.use('/order', order);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Express está escuchando en el puerto http://localhost:${PORT}`);
});

async function testConnection() {
  try {
    const result = await db`SELECT version()`;
    const version = result[0].version;
    console.log('Conexión exitosa a la base de datos. Versión de PostgreSQL:', version);
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1);
  }
}

testConnection();