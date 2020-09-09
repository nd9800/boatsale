const express = require("express");
const { Router } = require("express");
const app = express();
// thư viện này giúp  layout ngắn hơn đỡ lặp code
const expressLayouts = require('express-ejs-layouts');

//config các file static
app.use(express.static("public"));
// rút ngắn đường link 
app.use(express.static(__dirname+'public/css'));
app.use(express.static(__dirname+'public/js'));
app.use(express.static(__dirname+'public/img'));



//config sử dụng ejs
app.set("view engine","ejs");
app.set('views','./views');

// sử dụng thư viện express-ejs-layouts
app.use(expressLayouts);

// layout chính của trang
app.set('layout','./layout/layout');


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
app.use('/',require('./routes/cart'));
app.use('/',require('./routes/terms'));

const PORT = process.env.PORT || 5000;

//Tạo server

app.listen(PORT,function (){
    console.log("server is running...")
});
