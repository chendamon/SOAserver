var User = require('../models/user');

//register
var postUser = function(req,res){
  var user = new User({
    username:req.body.username,
    password:req.body.password,
    truename:req.body.truename,
  });
  //在入库前验证用户是否已经存在
  User.findOne({username:user.username},function(err,a_user){
    if(a_user){
      res.render('register',{message:'用户已存在！'});
      return;
    }
  });
  user.save(function(err){
    if(err){
      res.json({message:'用户注册失败！',data:err});
      return;
    }
    res.json({message:'用户注册成功！',data:user});
  });
}
//visit app page
var authed = function(req,res){
  if(!req.session.user){
    res.redirect('/login');
    return;
  }else{
    res.render('apps',{username:req.session.user.username});
  }

}
//login
var authenticate = function(req,res){
  User.findOne({ username:req.body.username },function(err,user){
    if(err)
      res.redirect('login',{message:err});
    if(!user)
    {
      res.render('login',{message:'无效的用户名！'});
    }else{
      user.vaerifyPassword(req.body.password,function(err,match){
        if(match && !err){
          //用户登录成功
          req.session.user = user;
          res.render('apps',{username:user.username});
        }else{
          res.render('login',{message:'密码错误！'});
        }
      });
    }
  });
}
module.exports = {
  postUser:postUser,
  authenticate:authenticate,
  authed:authed,
};
