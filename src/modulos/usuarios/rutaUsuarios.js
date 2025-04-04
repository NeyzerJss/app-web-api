const express = require('express');
const router = express.Router();
const respuesta = require('../../red/respuesta');
const controlador = require('./controladorUsuarios');

// Rutas de los Usuarios
router.get('/', function (req, res) {
    respuesta.error(req, res, 'Ruta de usuarios activa', 200);
});

router.get('/todos', async function (req, res) {
    try {
        const usuarios = await controlador.todos();
        respuesta.success(req, res, usuarios, 200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
});

router.get('/:id', async function (req, res) {
    try {
        const usuario = await controlador.uno(req.params.id);
        respuesta.success(req, res, usuario, 200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
});

router.post('/agregar', async function (req, res) {
    try {
        const { id, name, password, email } = req.body;

        if (!id) {
            // Agregar nuevo usuario
            const mensaje = await controlador.agregar({ name, password, email });
            respuesta.success(req, res, 'Usuario agregado correctamente', 200);
        } else {
            // Actualizar usuario existente
            const mensaje = await controlador.actualizar(id, name, password, email);
            respuesta.success(req, res, 'Usuario actualizado correctamente', 200);
        }
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
});

router.post('/eliminar', async function (req, res) {
    try {
        const resultado = await controlador.eliminar(req.body.id);
        respuesta.success(req, res, resultado, 200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
});

router.post('/validar', async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return respuesta.error(req, res, 'Faltan datos: email o contraseña', 400);
        }

        const usuario = await controlador.validarCredenciales(email, password);

        if (usuario) {
            respuesta.success(req, res, `Bienvenido ${usuario.name}`, 200);
        } else {
            respuesta.error(req, res, 'Usuario o contraseña incorrectos', 401);
        }
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
});

module.exports = router;