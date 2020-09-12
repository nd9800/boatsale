const express = require('express');
const router = express.Router();
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
router.get("/request",function (req,res){
    res.render("cart");
});
router.get("/request-complete",function (req,res){
    res.render("request-complete");
});
module.exports = router;
