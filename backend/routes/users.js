var express = require('express');
var router = express.Router();

// /api/user/join 경로처리 (회원가입시)
router.post("/join",async function(req,res){
  var user=req.body

  //같은 아이디로 가입된 사용자가 있는지 체크
  var alreadyUser=await User.findOne({
    where:{
      id:user.id
    }
  })

  if(alreadyUser){
    //이미 가입된 아이디
    res.json({
      success:false,
      message:"이미 가입된 아이디입니다"
    })
    return
  }

  await User.create(user)

  res.json({
    success:true
  })

})

router.post("/login",async function(req,res){
  var user=req.body
  
  //사용자가 입력한 아이디와 패스워드가 둘다 일치하는 사용자 데이터베이스에서 조회
  var alreadyUser=await User.findOne({
    where:{
      id:user.id,
      password:user.password
    }
  })

  if(!alreadyUser){   //아이디 또는 패스워드가 틀림 -> 로그인실패
    res.json({
      success:false,
      message:"아이디 또는 패스워드가 틀렸습니다"
    })
    return
  }

  //이 라인까지 왔으면 로그인 성공
  // TODO: 로그인된 사용자 세션에 저장

  res.json({
    success:true,
    user:alreadyUser
  })


})



module.exports = router;
