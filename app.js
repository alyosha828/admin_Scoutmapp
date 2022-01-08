var express = require('express');
var path = require('path');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.load();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var engine = require('ejs-locals');

var debug = require('debug')('test:server');
var http = require('http');
var indexRouter = require('./route/index');
var port = normalizePort(process.env.PORT || 5000);

var app = express();
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({//
  secret: process.env.SESSIONNAME,
  key: process.env.SESSIONSECRET,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },// 1 day    
  saveUninitialized: true,
  resave: false,
}));

app.use('/', indexRouter);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

///////////////Server configuration//////////////////////
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Listening on ' + bind)
}

/////////////////////////////////////
module.exports = app;


