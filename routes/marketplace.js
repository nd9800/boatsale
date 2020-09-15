const express = require('express');
const fs = require('fs');
const { parse } = require('path');
const router = express.Router();;
const db = require('../model/conect')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


    router.get("/location/product", async (req,res) =>{
      // let SQL1 = `SELECT T2004E_GROUP1_Boat.BoatName, T2004E_GROUP1_Boat.BoatPrice, T2004E_GROUP1_Boat.DestinationName, T2004E_GROUP1_Boat_Image.Boat_Image_1 ,T2004E_GROUP1_Boat_Info.InfoLength ,T2004E_GROUP1_Boat_Info.InfoPassengerCapacity
      // FROM  T2004E_GROUP1_Boat,T2004E_GROUP1_Boat_Image,T2004E_GROUP1_Boat_Info
      // WHERE T2004E_GROUP1_Boat.BoatID = T2004E_GROUP1_Boat_Image.BoatID and T2004E_GROUP1_Boat.BoatID =T2004E_GROUP1_Boat_Info.BoatID`;
      let query = req.query.name;
      let browsers = req.query.browsers;
      // let SQL1 = `SELECT *
      // FROM  T2004E_GROUP1_Boat,T2004E_GROUP1_Boat_Image,T2004E_GROUP1_Boat_Info,T2004E_GROUP1_Boat_Feature,T2004E_GROUP1_Destination  
      // WHERE T2004E_GROUP1_Boat.BoatID = T2004E_GROUP1_Boat_Image.BoatID and T2004E_GROUP1_Boat.BoatID =T2004E_GROUP1_Boat_Info.BoatID and T2004E_GROUP1_Boat.BoatID =T2004E_GROUP1_Boat_Feature.BoatID`;
      let SQL1 = `SELECT T2004E_GROUP1_Boat.BoatName, T2004E_GROUP1_Boat.BoatPrice, T2004E_GROUP1_Boat.DestinationName, T2004E_GROUP1_Boat_Image.Boat_Image_1 ,T2004E_GROUP1_Boat_Info.InfoLength ,T2004E_GROUP1_Boat_Info.InfoPassengerCapacity
      FROM  T2004E_GROUP1_Boat,T2004E_GROUP1_Boat_Image,T2004E_GROUP1_Boat_Info
      WHERE T2004E_GROUP1_Boat.BoatID = T2004E_GROUP1_Boat_Image.BoatID and T2004E_GROUP1_Boat.BoatID =T2004E_GROUP1_Boat_Info.BoatID`;
      // lấy được ramdom
      let SQL2 =`select * from T2004E_GROUP1_Destination where DestinationName like ('%${browsers}%')` 
      // lấy được location

      let SQL3 =`select * from T2004E_GROUP1_Boat_Image where BoatID in(
        select BoatID from T2004E_GROUP1_Boat where BoatName like ('%${query}%')
      ) `; 
      // lấy được img

      //lấy info
      let SQL4 =`select * from T2004E_GROUP1_Boat_Info where BoatID in(
        select BoatID from T2004E_GROUP1_Boat where BoatName like ('%${query}%'))`
      //lay Features
      let SQL5 =`select * from T2004E_GROUP1_Boat_Feature where BoatID in(
        select BoatID from T2004E_GROUP1_Boat where BoatName like ('%${query}%'))`

        let SQL6 =` select * from T2004E_GROUP1_Boat where BoatName  like ('%${query}%')`

      let boat =null;
      let boat2 =null;
      let boat3 =null;
      let boat4 =null;
      let boat5 =null;
      let boat6 =null;
     
      await  db.query(SQL1).then(result =>{
        boat = result;
      }).catch(err =>{
         console.log(err);
      })
      await  db.query(SQL2).then(result =>{
        boat2 = result;
   
      }).catch(err =>{
         console.log(err);
      })
      await  db.query(SQL3).then(result =>{
        boat3 = result;
      }).catch(err =>{
         console.log(err);
      })
      await  db.query(SQL4).then(result =>{
        boat4 = result;
      }).catch(err =>{
         console.log(err);
      })
      await  db.query(SQL5).then(result =>{
        boat5 = result;
      }).catch(err =>{
         console.log(err);
      })
      await  db.query(SQL6).then(result =>{
        boat6 = result;
      
      }).catch(err =>{
         console.log(err);
      })
      let names = boat.recordsets[0]
   


      let ramdom = Math.floor(Math.random() * names.length); 
      let filterdata = names.filter(e =>{
         if (e.BoatName == query) {
           return true;
           
         }
       })   
       console.log(filterdata)
    let total;
    if (ramdom > names.length - 4){
     total = names.length - ramdom;
     }else{
       total= false;
   }    
   console.log(total)
   console.log(ramdom)
   await  res.render('product',{
         product:filterdata,
         ramdoms:ramdom,
         name:names,
         totals:total,
         location :boat2.recordsets[0],
         img :boat3.recordsets[0],
         info:boat4.recordsets[0],
         Features:boat5.recordsets[0],
         BoatDescription:boat6.recordsets[0]
  
     })
   })
    router.get('/location/:id?', async (req,res) =>{
      
      // let SQL1 = "select * from  T2004E_GROUP1_Boat where BoatID = (SELECT BoatID  FROM T2004E_GROUP1_Boat_Image)";
    //  let SQL1 = "SELECT T2004E_GROUP1_Boat.BoatName, T2004E_GROUP1_Boat.BoatPrice, T2004E_GROUP1_Boat.DestinationName, T2004E_GROUP1_Boat_Image.Boat_Image_1 FROM  T2004E_GROUP1_Boat,T2004E_GROUP1_Boat_Image WHERE T2004E_GROUP1_Boat.BoatID = T2004E_GROUP1_Boat_Image.BoatID";
      let SQL1 = `SELECT T2004E_GROUP1_Boat.BoatName, T2004E_GROUP1_Boat.BoatPrice, T2004E_GROUP1_Boat.DestinationName, T2004E_GROUP1_Boat_Image.Boat_Image_1 ,T2004E_GROUP1_Boat_Info.InfoLength ,T2004E_GROUP1_Boat_Info.InfoPassengerCapacity
       FROM  T2004E_GROUP1_Boat,T2004E_GROUP1_Boat_Image,T2004E_GROUP1_Boat_Info
       WHERE T2004E_GROUP1_Boat.BoatID = T2004E_GROUP1_Boat_Image.BoatID and T2004E_GROUP1_Boat.BoatID =T2004E_GROUP1_Boat_Info.BoatID`;
       let SQL2 =`select * from T2004E_GROUP1_Destination`
        let location = req.query.browsers;
       let SQL3 =`select * from T2004E_GROUP1_Destination where  DestinationName like ('%${location}%')` ;
     
      let boat = null;
      let boat2 =null;
      let boat3 =null;
    await  db.query(SQL1).then(result =>{
      boat = result;
    
    }).catch(err =>{
       console.log(err);
    })
    await  db.query(SQL2).then(result =>{
      boat2 = result
    
    }).catch(err =>{
       console.log(err);
    })
    await  db.query(SQL3).then(result =>{
      boat3 = result
    }).catch(err =>{
       console.log(err);
    })
         let  contentJson =  boat.recordsets[0]
      
        let currentPage = req.params.id ||1
        let postsPerPage = 10;
        let indexOfLastPost = currentPage * postsPerPage;
        let indexOfFirstPost =  indexOfLastPost - postsPerPage;
        let totalPage =  Math.ceil(contentJson.length/postsPerPage) 
        let currentPost = contentJson.slice(indexOfFirstPost,indexOfLastPost);
     await   res.render('location',{
          product:currentPost,
          page:totalPage,
          currentPages:currentPage,
          boat2s:boat2.recordsets[0],
          boat3s:boat3.recordsets[0]
        })
     
  })
 
  // router.post('/demo',(res,req) =>{
  //     db.query("select * from  T2004E_GROUP1_Boat",function (err,rows) {
  //       if (err) {
  //           res.send("không có kết quả");
  //       } else {   
  //             req.json(
  //               rows.recordset
  //             )     
  //       }
  //   })
  // })

  router.post('/demo',async (req,res) =>{
    let SQL= `SELECT T2004E_GROUP1_Boat.BoatName, T2004E_GROUP1_Boat.BoatPrice, T2004E_GROUP1_Boat.DestinationName, T2004E_GROUP1_Boat_Image.Boat_Image_1 ,T2004E_GROUP1_Boat_Info.InfoLength ,T2004E_GROUP1_Boat_Info.InfoPassengerCapacity
    FROM  T2004E_GROUP1_Boat,T2004E_GROUP1_Boat_Image,T2004E_GROUP1_Boat_Info,T2004E_GROUP1_Destination
    WHERE T2004E_GROUP1_Boat.BoatID = T2004E_GROUP1_Boat_Image.BoatID and T2004E_GROUP1_Boat.BoatID =T2004E_GROUP1_Boat_Info.BoatID`
    let contentJson = null;
   let price_start_Number = req.body.price_start_Number;
   let price_end_Number = req.body.price_end_Number;
   
   await db.query(SQL).then(result =>{
      contentJson =  result.recordset
      let renger = contentJson.filter((array,index) =>{

        if ( price_end_Number >= array.BoatPrice && array.BoatPrice  >= price_start_Number) {
            return true
        }
      });
  
      let currentPage = req.params.id ||1
      let postsPerPage = 20;
      let indexOfLastPost = currentPage * postsPerPage;
      let indexOfFirstPost =  indexOfLastPost - postsPerPage;
      let totalPage =  Math.ceil(renger.length/postsPerPage) 
      let currentPost = renger.slice(indexOfFirstPost,indexOfLastPost);
    
       let demo =  res.json({
        product: renger,
        page:totalPage,
        currentPages:currentPost
       }
    )
    return demo
    }).catch(err =>{
      console.log(err)
    })

    })


    router.post('/fit',async (req,res) =>{
      let SQL= `SELECT T2004E_GROUP1_Boat.BoatName, T2004E_GROUP1_Boat.BoatPrice, T2004E_GROUP1_Boat.DestinationName, T2004E_GROUP1_Boat_Image.Boat_Image_1 ,T2004E_GROUP1_Boat_Info.InfoLength ,T2004E_GROUP1_Boat_Info.InfoPassengerCapacity
      FROM  T2004E_GROUP1_Boat,T2004E_GROUP1_Boat_Image,T2004E_GROUP1_Boat_Info
      WHERE T2004E_GROUP1_Boat.BoatID = T2004E_GROUP1_Boat_Image.BoatID and T2004E_GROUP1_Boat.BoatID =T2004E_GROUP1_Boat_Info.BoatID`
      let contentJson = null;
     let fit_start_Number = req.body.fit_start_Number;
     let fit_end_Number = req.body.fit_end_Number;
     
     await db.query(SQL).then(result =>{
        contentJson =  result.recordset
        let renger = contentJson.filter((array,index) =>{
  
          if ( fit_end_Number >= array.InfoLength && array.InfoLength >= fit_start_Number) {
              return true
          }
        });
        let currentPage = req.params.id ||1
        let postsPerPage = 20;
        let indexOfLastPost = currentPage * postsPerPage;
        let indexOfFirstPost =  indexOfLastPost - postsPerPage;
        let totalPage =  Math.ceil(renger.length/postsPerPage) 
        let currentPost = renger.slice(indexOfFirstPost,indexOfLastPost);
      
         let demo =  res.json({
          product: renger,
          page:totalPage,
          currentPages:currentPost
         }
      )
      return demo
      }).catch(err =>{
        console.log(err)
      })
  
      })
  
  
module.exports = router;
