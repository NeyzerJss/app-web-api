const bd = require ('../../DB/mysql')

const TABLA = 'clientes'

function todos (){
    return bd.todos(TABLA)

}

function uno (id) {
    return bd.uno(TABLA, id)
}

function eliminar (id) {
    return bd.eliminar(TABLA, id)
}

function actualizar (id, nombre, edad, telefono) {
    return bd.actualizar(TABLA, id, nombre, edad, telefono);
}

function agregar (data) {
    return bd.agregar(TABLA, data);
}

module.exports = {
    todos,
    uno,
    eliminar,
    actualizar,
    agregar,
}
