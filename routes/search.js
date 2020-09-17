/*
const app = express();
const config = {
    server:'101.99.13.2',
    database:'test',
    user: 'sa',
    password: 'z@GH7ytQ'
}

mssql.connect(config,function (err) {
    if(err) console.log("Error");
    else console.log("Connected!");
});
var db = new mssql.Request();

router.get("/search",function (req,res){
    let destination ="'%"+req.query.keyword+"%'";
    let date ="'%"+req.query.keyword+"%'";
    let duration ="'%"+req.query.keyword+"%'";
    //lấy dữ liệu
    db.query("SELECT * FROM T2004E_GROUP1_Destination WHERE DestinationArea LIKE "+destination+"OR SELECT * FROM T2004E_GROUP1_Contract WHERE ContractDateBegin LIKE"+date+"OR ",function (err,rows){
        if(err) res.send(err);
        else
            res.render("home",{
                khs:rows.recordset
            })
    })
    //res.render("home")
});
module.exports = router;
*/
