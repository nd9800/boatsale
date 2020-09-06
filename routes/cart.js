const express = require('express');
const router = express.Router();
router.get("/cart",function (req,res){
    res.render("cart");
})
module.exports = router;