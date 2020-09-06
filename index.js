const express = require("express");
const { Router } = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//Tạo sever

app.listen(PORT,function (){
    console.log("sever is running...")
});
//config các file static
app.use(express.static("public"));

//app.get("/",function (req,res) {
//res.send("Đây là trang chủ!");

//});
//config sử dụng ejs
app.set("view engine","ejs");
app.set('views','./views');
//config connect MSSQL
// const mssql = require("mssql");
//const config = {
//  user: 'quanghoa',
//password: 'Studentaptech123',
//server: 'cloud-apt.database.windows.net',
//database: 'T2004E',
//options: {
//  encrypt: false,
// enableArithAbort: true
//}
//}
// mssql.connect(config,function (err){
//     if(err) console.log(err);
//     else console.log("connect db thành công");
// });

app.use('/',require('./routes/linh'));  
app.use('/',require('./routes/marketplace'));