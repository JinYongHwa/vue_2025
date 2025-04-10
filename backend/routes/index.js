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
  //조회수를 1 올림
  article.hits++
  await article.save()    //1 올린 조회수를 데이터베이스에 저장

  res.json({
    success:true,
    article:article
  })

})

router.post("/api/articles",async function(req,res){
  var page=req.body.page
  if(!page){
    page=1
  }
  var offset=(page-1)*10
  var list=await Article.findAll({
    order:[
      ["no","DESC"],
      ["writeTime","DESC"]
    ],
    limit:10,
    offset:offset
  })
  var count=await Article.count()
  res.json({
    success:true,
    list:list,
    count:count
  })
})

router.delete("/api/article/:id",async function(req,res){
  var id=req.params.id
  await Article.destroy({
    where:{
      no:id
    }
  })
  res.json({
    success:true
  })
})
//글 수정 api
router.post("/api/article/modify",async function(req,res){
  var article=req.body    //front 에서 보내온 수정될글

  await Article.update({ //수정될 필드 입력력
    title:article.title,
    body:article.body,
    writerName:article.writerName
  },{
    //수정될 글의 조건
    where :{
      no : article.no
    }
  })
  //front 에 완료되었다고 응답
  res.json({
    success:true
  })
})

module.exports = router;
