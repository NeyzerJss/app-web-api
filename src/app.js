const express = require('express');
const config = require('./config');
const clientes = require('./modulos/clientes/rutas'); // Renombrar la importación
const usuarios = require('./modulos/usuarios/rutaUsuarios'); // Importar las rutas de usuarios

const app = express();

//Configuracion
app.use(express.json());
app.set('port', config.app.port);

//Rutas
app.use('/api/cliente', clientes) // Usar el nombre renombrado
app.use('/api/usuario', usuarios);


console.log(config.mysql)

module.exports = app;