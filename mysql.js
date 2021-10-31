const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
  database: process.env.DB
})
db.connect(function(err) {
   if (err) throw err;
   console.log("Connecting to database successful");
});
module.exports = db;
