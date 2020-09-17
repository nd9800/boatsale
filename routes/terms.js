const express = require('express');
const router = express.Router();
router.get("/terms_of_service",function (req,res){
    res.render("terms");
});
module.exports = router;
