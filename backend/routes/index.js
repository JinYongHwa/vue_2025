var express = require('express');
var router = express.Router();
var fs=require("fs")
var path=require("path")

/* GET home page. */
router.get('/', function(req, res, next) {
  var filePath=path.join(__dirname,"test.png")
  console.log(filePath)
  var file=fs.readFileSync(filePath)
  res.setHeader("Content-Disposition", "attachment;filename=mjc.png")
  //res.setHeader("c/ontent-type","application/json;utf-8");
  res.end(file)  

});

router.get("/test",async function(req,res){
  var item={
    title:"첫번째 블로그 글",
    body:"안녕하세요",
    writerName:"진용화"
  }
  // Article.create(item).then(function(article){
  //   console.log(article)
    //   res.json({
  //     success:true,
  //     article:article
  //   })
  // })
  var article=await Article.create(item)
  console.log(article)
  res.json({
    success:true,
    article:article
  })
  
})


router.post("/api/write",async function(req,res){
  console.log(req.body)
  var article=await Article.create(req.body)
  res.json({
    success:true,
    article:article
  })
})
router.get("/api/article/:no",async function(req,res){
  var no=req.params.no
  var article=await Article.findOne({
    where:{
      no:no
    }
  })
  res.json({
    success:true,
    article:article
  })

})

router.post("/api/articles",async function(req,res){
  var list=await Article.findAll()
  res.json({
    success:true,
    list:list
  })
})


module.exports = router;
