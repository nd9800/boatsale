const express = require('express');
const fs = require('fs');
const { parse } = require('path');
const router = express.Router();;

// convert sang Json
function processFile(contentString) {

  return  JSON.parse(contentString)
  
  }
  // đọc file Json dồng bộ
  let text = fs.readFileSync('data.json','utf8')

// product.ejs
  router.get("/location/product",(req,res) =>{
     let query = req.query.name
     let names = JSON.parse(text)
     let ramdom = Math.floor(Math.random() * names.length); 
     let filterdata = names.filter(e =>{
        if (e.name == query) {
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
    res.render('product',{
        product:filterdata[0],
        ramdoms:ramdom,
        name:names,
        totals:total

    })
  })

  // đọc file Json Bất đông bộ 
  //location.ejs
  fs.readFile('data.json', 'utf-8',function (err, data) {
    if (err) {
        throw err;
    }
      let contentString = data;
      let contentJson =  processFile(contentString)
      router.get('/location/:id?',(req,res) =>{
      let currentPage = req.params.id ||1
        console.log(currentPage);
        let postsPerPage = 10;
        let indexOfLastPost = currentPage * postsPerPage;
        let indexOfFirstPost =  indexOfLastPost - postsPerPage;
        let totalPage =  Math.ceil(contentJson.length/postsPerPage) 
        let currentPost = contentJson.slice(indexOfFirstPost,indexOfLastPost);
      res.render('location',{
        product:currentPost,
        page:totalPage,
        currentPages:currentPage
      })
   
        
        }) 
          
  });
  router.post('/cart',(req,res) =>{
      res.redirect('/cart')
  })
module.exports = router;
