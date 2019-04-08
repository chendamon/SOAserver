exports.openApp = function(req,res){
  //console.log('clienturl',req.body.clientUrl,'req user',req.session.user);
  res.redirect(req.body.clientUrl);
}
