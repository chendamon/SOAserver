exports.applist = (req, res) => {
  res.render('apps', { username: 'hahaha' });
};
exports.logout = (req,res) =>{
  req.session.user = null;
  res.redirect('/login');
}
