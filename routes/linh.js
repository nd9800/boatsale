const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const db = require('../model/conect')
router.get("/",function (req,res){
    let sql_text = `SELECT * FROM T2004E_GROUP1_Destination WHERE DestinationArea LIKE 'Mediterranean';
                    SELECT * FROM T2004E_GROUP1_Destination WHERE DestinationArea LIKE 'Rest of the World';
                    SELECT * FROM T2004E_GROUP1_Destination WHERE DestinationArea LIKE 'The Caribbean'`
=======

const mssql = require("mssql");
const config = {
    server:'101.99.13.2',
    database:'test',
    user: 'sa',
    password: 'z@GH7ytQ'
}

mssql.connect(config,function (err) {
    if(err) console.log("Error");
    else console.log("Connected!");
});
var db = new mssql.Request();
router.get("/",function (req,res){
    let sql_text = "SELECT * FROM T2004E_GROUP1_Destination;SELECT * FROM T2004E_GROUP1_Destination WHERE DestinationArea LIKE 'Mediterranean';SELECT * FROM T2004E_GROUP1_Destination WHERE DestinationArea LIKE 'Rest of the World';SELECT * FROM T2004E_GROUP1_Destination WHERE DestinationArea LIKE 'The Caribbean'";
>>>>>>> 8a245ff61cbe06cca39ae5efb3c2ee910affa1bd
    db.query(sql_text, function (err,rows){
        if(err)
            res.send("Khong co ket qua"); 
        else
            res.render("linh",{
                des: rows.recordsets[0],
                med: rows.recordsets[1],
                rest: rows.recordsets[2],
                car: rows.recordsets[3],
                layout:false
            })
    })
});


module.exports = router;