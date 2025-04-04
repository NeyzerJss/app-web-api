const bd = require('../../DB/mysqlUsuarios');

const TABLA = 'usuarios';

function todos() {
    return bd.todos(TABLA);
}

function uno(id) {
    return bd.uno(TABLA, id);
}

function eliminar(id) {
    return bd.eliminar(TABLA, id);
}

function actualizar(id, name, password, email) {
    return bd.actualizar(TABLA, id, name, password, email);
}

function agregar(data) {
    return bd.agregar(TABLA, data);
}

async function validarCredenciales(email, password) {
    const usuarios = await bd.todos(TABLA);
    const usuarioValido = usuarios.find(
        (usuario) => usuario.email === email && usuario.password === password
    );
    return usuarioValido || null;
}

module.exports = {
    todos,
    uno,
    eliminar,
    actualizar,
    agregar,
    validarCredenciales
};
