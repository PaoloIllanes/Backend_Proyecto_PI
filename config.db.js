const dotenv = require("dotenv");
dotenv.config();

const mysql = require('mysql2');
let connection;

try {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'paolo',
        password: 'paolo',
        database: 'COIN_EXCHANGE',
        port: 3306
    });
} catch (error) {
    console.log("Error al conectar con la base de datos");
}

module.exports = {connection};