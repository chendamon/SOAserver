var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var Client = require('../models/clients');
passport.use('client-basic',new BasicStrategy(
  function(clientId,clientSecret,done){
    console.log('clientid',clientId,' ',secret);
    Client.findOne({clientId:clientId},function(err,client){
      if(err) done(err);
      if(!client||client.clientSecret != secret)
        done(null,false);
      else done(null,client);
    });
  }
));
function verifyClient(clientId, clientSecret, done) {
  Client.findOne({clientId:clientId}, function(error, client){
    if (error) return done(error);
    if (!client) return done(null, false);
    if (client.clientSecret !== clientSecret) return done(null, false);
    console.log('client authed ',client);
    return done(null, client);
  });
}

module.exports = {
  authed:passport.authenticate('client-basic',{session:false}),
  verifyClient:verifyClient,
};
