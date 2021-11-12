require('dotenv').config()
const mysql = require('mysql2/promise');

//connect to mysql database
const mysql_connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});


module.exports = mysql_connection;
