const mysql = require('mysql2')
const myconfig = require('../config')

const dbconfig = {
    host: myconfig.mysql.host,
    user: myconfig.mysql.user,
    password: myconfig.mysql.password,
    database: myconfig.mysql.database
}

//console.log(dbconfig)

function conMysql() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.log('[bd err]', err);
            setTimeout(conMysql, 200)
        } else {
            console.log('BD conectado')
        }
    })
    conexion.on('error', err => {
        console.log('[bd err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql()
        } else {
            throw err;
        }
    })

}

conMysql()


function todos (tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT *FROM  ${tabla}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

function uno (tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM  ${tabla} WHERE id = ${id} `, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

function eliminar (tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} where id = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })

}

function actualizar(tabla, id, nombre, edad, telefono) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${tabla} SET nombre = ?, edad = ?, telefono = ? WHERE id = ?`;
        conexion.query(query, [nombre, edad, telefono, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function agregar(tabla, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${tabla} (nombre, edad, telefono) VALUES (?, ?, ?)`;
        conexion.query(query, [data.nombre, data.edad, data.telefono], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

module.exports = {
    todos,
    uno,
    eliminar,
    actualizar,
    agregar
}