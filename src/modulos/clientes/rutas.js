const express = require('express');
const router = express.Router();
const respuesta = require ('../../red/respuesta')
const controlador = require ('./controlador.js');



// Rutas de los clientes
router.get('/', function (req, res) {
    respuesta.error(req, res,'intenta esto mas tarde', 200)
    // res.send('Estas en la raiz del cliente')
})

router.get('/todos', async function (req, res) {
    try {
        const item = await controlador.todos()
        respuesta.success(req, res, item, 200)
    } catch (error) {
        respuesta.error(req, res, error, 500)
    }
})


router.get('/:id', async function (req, res) {
    try {
        const item = await controlador.uno(req.params.id) 
        respuesta.success(req, res, item, 200)
    } catch (error) {
        respuesta.error(req, res, error, 500)
    }
})

router.post('/agregar', async function (req, res) {
    try {
        const { id, nombre, edad, telefono } = req.body;

        if (!id) {
            // Agregar nuevo cliente
            const mensaje = await controlador.agregar({ nombre, edad, telefono });
            respuesta.success(req, res, 'Cliente agregado correctamente', 200);
        } else {
            // Actualizar cliente existente
            const mensaje = await controlador.actualizar(id, nombre, edad, telefono);
            respuesta.success(req, res, 'Cliente actualizado correctamente', 200);
        }
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
});

router.post('/eliminar', async function (req, res) {
    try {
        const item = await controlador.eliminar(req.body.id)
        respuesta.success(req, res, item, 200)
    } catch (error) {
        respuesta.error(req, res, error, 500)
    }
})

module.exports = router;