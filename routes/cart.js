const express = require('express');
const router = express.Router();
router.get("/request",function (req,res){
    res.render("cart");
});
module.exports = router;
