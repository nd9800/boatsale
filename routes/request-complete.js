const express = require('express');
const router = express.Router();
router.get("/request-complete",function (req,res){
    res.render("request-complete");
});
module.exports = router;
