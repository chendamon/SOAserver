var User = require('../models/user');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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
var authed = function(req,res,done){
  if(!req.session.user){
    res.redirect('/login');
    return;
  }else{
    console.log('user ',req.session.user);
    req.user = req.session.user;
    done(null,req.user);
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
          res.render('apps',{username:user.truename});
        }else{
          res.render('login',{message:'密码错误！'});
        }
      });
    }
  });
}
//user userprofile
var profile = function(req,res){
  User.findOne({username:req.user.username},function(err,user){
    if(err){
      res.json({data:err});
      return;
    }
    res.json({data:user});
  });
}
//localstreagy 认证
passport.use('local',new LocalStrategy(
  function(username, password, done){
    console.log('username ',username,' password',password);
    User.findOne({username:username}, function(err, user){
      if (err) return done(err);
      if (!user) return done(null, false,{message:'user not'});
      console.log(user.password,' ',password);
      if (user.password !== password) return done(null, false);
      return done(null, user);
    });
  }
));
module.exports = {
  postUser:postUser,
  authenticate:authenticate,
  authed:authed,
  profile:profile,
  isAuthenticated: passport.authenticate('local', { session: false }),
};
