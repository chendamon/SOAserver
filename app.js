var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyparser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var apps = require('./routes/apps');

var usercontrol = require('./middleware/user');
var oauth2 = require('./middleware/oauth2');
var auth = require('./middleware/auth');

//读取预设值
var config = require('./config');

var app = express();
//数据库
mongoose.connect(config.get('mongoose:uri'));
//mongoose.connect('mongodb://127.0.0.1:27017/SSO');
mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


//session 配置
app.use(cookieParser());
app.use(bodyparser.json({ extended: false }));
app.use(bodyparser.urlencoded({ extended:false }));
app.use(session({
  secret:'sdfdasds-454-dfsadfa-sdfas',
  saveUninitialized:false,
  resave:false,
}));
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use('/', router);
router.route('/').get(usercontrol.authed, apps.applist);
//auth2.0
router.route('/oauth2/authorize')
  .get(usercontrol.authed,oauth2.authorization)
  .post(usercontrol.authed,oauth2.decision);
router.route('/userprofile').get(auth.tokenAuthed,usercontrol.profile);

//login and register
app.post('/logout',apps.logout);
app.get('/login',login.form);
app.post('/login',usercontrol.authenticate);
app.get('/register',register.form);
app.post('/register',usercontrol.postUser);
app.post('/oauth2/token',oauth2.mytoken);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//从config读取端口信息


module.exports = app;
