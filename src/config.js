require('dotenv').config();

// Configuración de la aplicación
module.exports = {
    app: {
        port:process.env.PORT || 4000
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PW || '',
        database: process.env.MYSQL_DB || 'test'
    },
}