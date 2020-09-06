const express = require("express");
const app = express();

const PORT=process.env.PORT || 5000;
app.listen(PORT,function () {
    console.log("server is running...");
});
app.use(express.static("public"));
app.set("view engine","ejs");
const fs = require("fs");

app.get("/",function (req,res){
        res.render("linh");
})
