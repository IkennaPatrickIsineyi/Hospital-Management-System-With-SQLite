///model/hms.db.js
//import mysql2
const sqlite3 = require("sqlite3").verbose();
//require("dotenv/config");
//import db config
//const dbConfig = require("../config/hms.config.js");
//create db connection object

const connection = new sqlite3.Database('./hmsdb.db', (error) => {
    if (error) return console.log("Database connection error", error);
    else {
        console.log("Database connected!!!");
        connection.get("pragma foreign_keys=on");
    }
});
/* const connection = mysql.createConnection({
    'user': process.env.USER,
    'host': process.env.HOST,
    'password': process.env.PASSWORD,
    'database': process.env.DATABASE,
    'port': process.env.DBPORT
}); */
//connect to db
/* connection.connect((error) => {
    if (error) return console.log("Database connection error", error);
    else console.log("Database connected!!!");
}); */
//export connection
module.exports = connection;
