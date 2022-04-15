const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'logindes_thamiuser',
//     password: 'universe123',
//     database: 'logindes_thamidb'
// })
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'thami'
})

const conn = async()=> await db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("mysql connected")
    }
})

exports.conn = conn;
exports.db = db;


//create database
// app.get('/createDB', (req,res,next)=>{
//     let sql = 'CREATE DATABASE thami'
//     db.query(sql, (error, result)=>{
//         if (error) throw error;
//         console.log(result);
//         res.send('Database is created')
//     })
// })

//create table
// app.get('/createTable', (req,res,next)=>{
//     let sql = 
//     'CREATE TABLE IF NOT EXISTS users(id int AUTO_INCREMENT PRIMARY KEY, username varchar(255) NOT NULL, password varchar(255) NOT NULL, email varchar(255) NOT NULL)';
//     db.query(sql,(error, result)=>{
//         if (error) throw error;
//         console.log(result)
//         res.send('table created');
//     })  
// })
