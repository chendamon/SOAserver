var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var Token = require('../models/token');
var User = require('../models/user');

passport.use(new BearerStrategy(
  function(atoken,done){
    Token.findOne({value:atoken},function(err,token){
      if(err)
        return done(err);
      if(!token)
        return done(null,false);
      User.findOne({_id:token.userId},function(err,user){
        if(err)
          return done(err);
        if(!user)
          return done(null,false);
        done(null,user);
      });
    });
  }
));
module.exports = {
  tokenAuthed: passport.authenticate('bearer',{ session:false }),
};
