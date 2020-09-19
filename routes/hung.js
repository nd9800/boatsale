const express = require('express');
const router = express.Router();
router.get("/contact",function (req,res){
    res.render("contact")

});
router.get("/about",function (req,res){
    res.render("about")

});
router.get("/privacy_policy",function (req,res){
    res.render("privacy_policy")

});
router.get("/terms_of_service1",function (req,res){
    res.render("terms_of_service1")

});
router.get("/press",function (req,res){
    res.render("press")

});
module.exports = router;
