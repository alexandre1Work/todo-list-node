//Conexão com o banco da dados
const mysql = require('mysql2/promise');
//Importar a biblioteca do dotenv,Importando as variáveis ambiente
require('dotenv').config();

const conection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

module.exports = conection;