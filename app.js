/**
 * Created by bestxie on 2016/10/29 14:50.
 */
var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');
var db = require("./models/db.js");

var app = express();

var session = require('express-session');
//使用session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ "limit":"10000kb"}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'userinfo')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message:'没有这个页面',
      error: ''
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//socket.io公式：
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on("connection",function(socket){
  socket.on("reqmsg",function(msg){
    console.log(msg)
    //把接收到的msg原样广播
    io.emit("resmsg",msg);
  });
});
//监听
http.listen(3000);
module.exports = app;
