const express = require('express');
const fs = require('fs');
const { parse } = require('path');
const router = express.Router();;
const db = require('../model/conect')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get("/location/product", async (req,res) =>{
  let query = req.query.name;
  let browsers = req.query.browsers;
  let BoatID = req.query.BoatID;
  let BoatIDNumber = parseInt(BoatID)
  let SQL1 = ` SELECT *
  FROM (((T2004E_GROUP1_Destination
  INNER JOIN T2004E_GROUP1_Boat ON T2004E_GROUP1_Destination.DestinationName  like  ('%${browsers}%'))
  INNER JOIN T2004E_GROUP1_Boat_Info ON T2004E_GROUP1_Boat.BoatID = T2004E_GROUP1_Boat_Info.BoatID)
  INNER JOIN T2004E_GROUP1_Boat_Image ON T2004E_GROUP1_Boat_Image.BoatID = T2004E_GROUP1_Boat_Info.BoatID)`;
  let SQL2 = ` SELECT *
  FROM ((((T2004E_GROUP1_Boat
      INNER JOIN T2004E_GROUP1_Destination ON T2004E_GROUP1_Destination.DestinationName  like  ('%${browsers}%'))
  INNER JOIN T2004E_GROUP1_Boat_Info ON T2004E_GROUP1_Boat_Info.BoatID = ${BoatIDNumber} AND T2004E_GROUP1_Boat.BoatID = ${BoatIDNumber})
  INNER JOIN T2004E_GROUP1_Boat_Image ON T2004E_GROUP1_Boat_Image.BoatID = ${BoatIDNumber})
  INNER JOIN T2004E_GROUP1_Boat_Feature ON T2004E_GROUP1_Boat_Feature.BoatID = ${BoatIDNumber})`;
  let boat =null;
  let boat2 =null;
  
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
  let names = boat.recordsets[0]

  let ramdom = Math.floor(Math.random() * names.length); 
  let filterdata = names.filter(e =>{
      if (e.BoatName == query) {
        return true;
        
      }
    })   

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
      boats : boat2.recordsets[0]
  })
})
router.get('/location/:id?', async (req,res) =>{
  let location = req.query.browsers;
    let SQL1 =` SELECT *
    FROM (((T2004E_GROUP1_Destination
    INNER JOIN T2004E_GROUP1_Boat ON T2004E_GROUP1_Destination.DestinationName  like  ('%${location}%'))
    INNER JOIN T2004E_GROUP1_Boat_Info ON T2004E_GROUP1_Boat.BoatID = T2004E_GROUP1_Boat_Info.BoatID)
    INNER JOIN T2004E_GROUP1_Boat_Image ON T2004E_GROUP1_Boat_Image.BoatID = T2004E_GROUP1_Boat_Info.BoatID)`;
  let SQL2 =`select * from T2004E_GROUP1_Destination where  DestinationName like ('%${location}%')` ;
  let boat = null;
  let boat2 =null;
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
      boat3s:boat2.recordsets[0]
    })
  
})
 
router.post('/demo',async (req,res) =>{
  let browsers = req.body.browsers;
  let SQL1 =` SELECT *
  FROM (((T2004E_GROUP1_Destination
  INNER JOIN T2004E_GROUP1_Boat ON T2004E_GROUP1_Destination.DestinationName  like  ('%${browsers}%'))
  INNER JOIN T2004E_GROUP1_Boat_Info ON T2004E_GROUP1_Boat.BoatID = T2004E_GROUP1_Boat_Info.BoatID)
  INNER JOIN T2004E_GROUP1_Boat_Image ON T2004E_GROUP1_Boat_Image.BoatID = T2004E_GROUP1_Boat_Info.BoatID)`;

  let contentJson = null;
  let price_start_Number = req.body.price_start_Number;
  let price_end_Number = req.body.price_end_Number;
  console.log(typeof browsers)
  await db.query(SQL1).then(result =>{
    contentJson =  result.recordsets[0]
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
  
      res.json({
      product: renger,
      page:totalPage,
      currentPages:currentPost
      }
  )

  }).catch(err =>{
    console.log(err)
  })

  })

router.post('/fit',async (req,res) =>{
  let contentJson = null;
  let fit_start_Number = req.body.fit_start_Number;
  let fit_end_Number = req.body.fit_end_Number;
  let browsers = req.body.browsers;
  let SQL1 = ` SELECT *
  FROM (((T2004E_GROUP1_Destination
  INNER JOIN T2004E_GROUP1_Boat ON T2004E_GROUP1_Destination.DestinationName  like  ('%${browsers}%'))
  INNER JOIN T2004E_GROUP1_Boat_Info ON T2004E_GROUP1_Boat.BoatID = T2004E_GROUP1_Boat_Info.BoatID)
  INNER JOIN T2004E_GROUP1_Boat_Image ON T2004E_GROUP1_Boat_Image.BoatID = T2004E_GROUP1_Boat_Info.BoatID)`
  await db.query(SQL1).then(result =>{
    contentJson =  result.recordsets[0]
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
  
    res.json({
      product: renger,
      page:totalPage,
      currentPages:currentPost
      }
  )

  }).catch(err =>{
    console.log(err)
  })
}) 

router.post('/request',(req,res) =>{
    res.redirect('/request')
})
module.exports = router;
