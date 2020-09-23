const express = require('express');
const router = express.Router();
const db = require('../model/conect')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.get("/cart", async function (req,res){
    let qssty = req.query.qssty;
    let type = req.query.type;
    let time = req.query.time;  
    let date = req.query.calendar;
    let usd = req.query.usd;
    let usdInt = parseInt(usd)
    let boatID = req.query.boatID;
    let boatIDInt = parseInt(boatID)
    console.log(boatIDInt)
    let SQL = `select *  from T2004E_GROUP1_Destination where DestinationName   in
     (select DestinationName   from T2004E_GROUP1_Boat where BoatID = ${boatIDInt})`
     let SQL2 = `select *  from T2004E_GROUP1_Boat_Image where BoatID = ${boatIDInt}`
     let SQL3 = `select *  from T2004E_GROUP1_Boat where BoatID = ${boatIDInt}`
     let SQL4 = `select * from T2004E_GROUP1_Destination  `
     
    // BoatID ${boatID} DestinationName 
    let boat = null;
    let boat2 = null;
    let boat3 = null;
    let locationHeader =null;
   await db.query(SQL).then(result =>{
    boat = result;    
   }).catch(err =>{
       console.log(err)
   })
   await db.query(SQL2).then(result =>{
    boat2 = result;
   }).catch(err =>{
       console.log(err)
   })
   await db.query(SQL3).then(result =>{
    boat3 = result;
   }).catch(err =>{
       console.log(err)
   })
   await db.query(SQL4).then(result =>{
    locationHeader = result;
   }).catch(err =>{
       console.log(err)
   })
    res.render("cart",{
        qtys:qssty,
        types:type,
        times:time,
        dates:date,
        usds:usdInt,
        boatIDs:boatIDInt,
        boats:boat.recordset[0],
        boat2s:boat2.recordsets[0],
        boat3s:boat3.recordsets[0],
        locations:locationHeader.recordsets[0]
    });
});
router.get("/request-complete",async function (req,res){
    let SQL4 = `select * from T2004E_GROUP1_Destination  `;
    let locationHeader =null
    await db.query(SQL4).then(result =>{
        locationHeader = result;
       }).catch(err =>{
           console.log(err)
       })
    res.render("request-complete",{
        locations:locationHeader.recordsets[0]
    });
});


router.use(bodyParser.urlencoded({extended:true}));
router.post("/request-complete",function (req,res){
    let fn = req.body.CustomerFirstName;
    let ln = req.body.CustomerLastName;
    let email = req.body.CustomerEmail;
    let phone = req.body.CustomerPhone;
    let sql_text = "INSERT INTO T2004E_GROUP1_Customer(CustomerFirstName,CustomerLastName,CustomerEmail,CustomerPhone) VALUES('"+fn+"','"+ln+"','"+email+"','"+phone+"')"
    db.query(sql_text,function(err,rows){
        if(err) res.send(err);
        else res.redirect("/request-complete");
    })
})


module.exports = router;