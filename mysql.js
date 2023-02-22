const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
  database: process.env.DB
});

module.exports = db;
