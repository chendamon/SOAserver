var Client = require('../models/clients');

exports.applist = (req, res) => {
  //logopath,name,description,shijian
  Client.find({}).sort({'created':-1}).exec(function(err,fcs){
    res.render('apps', { user: req.session.user, clients:fcs });
  });
};
exports.logout = (req,res) =>{
  req.session.user = null;
  res.redirect('/login');
}
