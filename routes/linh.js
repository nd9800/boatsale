const express = require('express');
const router = express.Router();
const db = require('../model/conect')
router.get("/",function (req,res){
    let sql_text = `SELECT * FROM T2004E_GROUP1_Destination WHERE DestinationArea LIKE 'Mediterranean';
                    SELECT * FROM T2004E_GROUP1_Destination WHERE DestinationArea LIKE 'Rest of the World';
                    SELECT * FROM T2004E_GROUP1_Destination WHERE DestinationArea LIKE 'The Caribbean'`
    db.query(sql_text, function (err,rows){
        if(err)
            res.send("Khong co ket qua"); 
        else
            res.render("linh",{
                med: rows.recordsets[0],
                rest: rows.recordsets[1],
                car: rows.recordsets[2],
                layout : false
            })
    })
});
module.exports = router;