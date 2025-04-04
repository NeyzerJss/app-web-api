const mysql = require('mysql2');
const myconfig = require('../config');

const dbconfig = {
    host: myconfig.mysql.host,
    user: myconfig.mysql.user,
    password: myconfig.mysql.password,
    database: myconfig.mysql.database
};

let conexion;

function conMysql() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.log('[bd err]', err);
            setTimeout(conMysql, 200);
        } else {
            console.log('BD Usuarios conectado');
        }
    });

    conexion.on('error', (err) => {
        console.log('[bd err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }
    });
}

conMysql();

function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function eliminar(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, [id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function actualizar(tabla, id, name, password, email) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${tabla} SET name = ?, password = ?, email = ? WHERE id = ?`;
        conexion.query(query, [name, password, email, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function agregar(tabla, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${tabla} (name, password, email) VALUES (?, ?, ?)`;
        conexion.query(query, [data.name, data.password, data.email], (error, result) => {
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
};
