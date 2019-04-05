var Client = require('../models/clients');
exports.form = (req, res) => {
  //如果已经登录就不需要再重新登录了
  //2019.04.05
  if(!req.session.user){
    res.render('login', { title: '登录' });
  }else{
    Client.find({}).sort({'created':-1}).exec(function(err,fcs){
      res.render('apps', { username: req.session.user.truename, clients:fcs });
    });
  }

};
