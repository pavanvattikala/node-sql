const mysql = require("mysql2");
require("dotenv").config();

const config = {
    host : process.env.host,
    user: process.env.user,
    password : process.env.password,
    database : process.env.database 
}

const db = mysql.createConnection(config);

db.connect((err) => {
    if(err){
        console.log('Unable to Conect to The Data Base');
        console.log(err);
    }
    else{
        console.log("Connected to the Data Base");
    }
});

module.exports = db;