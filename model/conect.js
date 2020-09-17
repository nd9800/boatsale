
const mssql = require("mssql");
const config = {
    server:'101.99.13.2',
    database:'test',
    user: 'sa',
    password: 'z@GH7ytQ'
}
 mssql.connect(config,function (err){
     if(err) console.log(err);
     else console.log("connect db thành công");
 })

module.exports = mssql;