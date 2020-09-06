const express = require('express');
const router = express.Router();
router.get("/",function (req,res){
    res.render("linh",{layout:false});
})
module.exports = router;