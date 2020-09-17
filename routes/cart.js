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
    // BoatID ${boatID} DestinationName 
    let boat = null;
    let boat2 = null;
   await db.query(SQL).then(result =>{
    boat = result;
    console.log(boat.recordset[0])
   }).catch(err =>{
       console.log(err)
   })
   await db.query(SQL2).then(result =>{
    boat2 = result;
    console.log(boat2.recordset[0])
   }).catch(err =>{
       console.log(err)
   })
    console.log( qssty)
    console.log(usd)
    console.log(type)
    console.log(time)
    console.log(date)
    console.log(boatID)
    res.render("cart",{
        qtys:qssty,
        types:type,
        times:time,
        dates:date,
        usds:usdInt,
        boatIDs:boatID,
        boats:boat.recordsets[0],
        boat2s:boat2.recordsets[0]
     //   boats:boat.recordsets[0]
    });
});
router.get("/request-complete",function (req,res){
    res.render("request-complete");
});
module.exports = router;
