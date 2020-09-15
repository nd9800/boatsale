const express = require('express');
const router = express.Router();
const mssql = require("mssql");
const app = express();
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



const bodyParser =require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.post("/form-complete",function (req,res){
    let fn = req.body.CustomerName;
    let ln = req.body.CustomerLastname;
    let email = req.body.CustomerEmail;
    let phone = req.body.CustomerPhone;
    let sql_text = "INSERT INTO T2004E_GROUP1_Customer(CustomerName,CustomerLastname,CustomerEmail,CustomerPhone) VALUES('"+fn+"','"+ln+"','"+email+"','"+phone+"')"
    db.query(sql_text,function(err,rows){
        if(err) res.send(err);
        else res.redirect("/request-complete");
    })
})
module.exports = router;