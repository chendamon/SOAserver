var User = require('../models/user');
var Client = require('../models/clients');
var passport = require('passport');
var bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

//用户注册
var postUser = function(req,res){
  var user = new User({
    username:req.body.username,
    password:req.body.password,
    truename:req.body.truename,
  });
  //console.log('register user:',user);
  //在入库前验证用户是否已经存在
  User.findOne({username:user.username},function(err,a_user){
    if(a_user){
      res.render('register',{message:'用户已存在！'});
      return;
    }
  });
  user.save(function(err){
    if(err){
      res.render('register',{message:'用户注册失败！'});
      return;
    }
    res.render('login',{message:'用户注册成功，请登录！'});
  });
}
//访问app列表前检测是否已经登录
var authed = function(req,res,done){
  //console.log('user now:',req.session.user);
  if(!req.session.user){
    res.redirect('/login');
    return;
  }else{
    req.user = req.session.user;
    done(null,req.user);
  }

}
//登录认证
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
          //添加clients 2019.04.04
          Client.find({}).sort({'created':-1}).exec(function(err,fcs){
            res.render('apps', { user: user, clients:fcs });
          });
        }else{
          res.render('login',{message:'密码错误！'});
        }
      });
    }
  });
}
//user userprofile
//返回json字符串 2019.04.04
var profile = function(req,res){
  User.findOne({username:req.user.username},function(err,user){
    if(err){
      res.json({data:err});
      return;
    }
    //console.log('user profile: ',user.username);
    //尝试设定限额quota
    //2019.04.06 并没有起作用
    res.json({identifier:user.username,displayName:user.truename,Quota:'10'});
  });
}
//重定向解决session问题
//2019.04.07
var relogin = function(req,res){
  req.session.user = null;
  res.redirect('/');
}
//更新用户密码
//2019.04.09
var updateUser = function(req,res){
  User.findOne({username:req.session.user.username},function(err,user){
    if(err){
      res.json({data:err});
      return;
    }
    user.vaerifyPassword(req.body.oldPassword,function(err,match){
      if(match && !err){
        //更新用户密码
        //用户密码加密
        bcrypt.genSalt(10,function(err,salt){
          bcrypt.hash(req.body.newPassword,salt,function(err,hash){
            //console.log('hash',hash);
            User.updateOne({username:req.session.user.username},{password:hash},function(err){
              if(err){
                res.json({data:err});
                return;
              }
              //重定向至登录界面
              req.session.user = null;
              res.render('login',{message:'密码修改成功，请登录！'})
            });
          });
        });
      }else{
        res.render('passwd',{message:'原始密码错误！'});
      }
    });
  });

}
module.exports = {
  postUser:postUser,
  authenticate:authenticate,
  authed:authed,
  profile:profile,
  relogin:relogin,
  updateUser:updateUser,
};
