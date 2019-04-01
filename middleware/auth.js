var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');

//对user身份进行认证，采用local Strategy
passport.use('local',new localStrategy(
  function(username,password,done){
    User.findOne({ username:username },function(err,user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null,false,{message:'无效的用户名！'});
      }
      user.vaerifyPassword(password,function(err,match){
        if(err){
          return done(err);
        }
        if(!match){
          return done(null,false,{message:'密码错误！'});
        }
        return done(null,user);
      });
    });
  }
));

module.exports = {
  userAuthed: passport.authenticate('local',{ session:false }),
};
