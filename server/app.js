const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const boxes = require('./routes/boxes');
const items = require('./routes/items');
const users = require('./routes/users');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3001;
server.listen(port, () => console.log(`Listening on port ${port}`));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/boxes', boxes);
app.use('/items', items);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

let userData = [];

io.on('connection', client => {
  let currentUser;
  console.log('Client connected...');
  client.on('user', user => {
    currentUser = user;
    let foundUser = userData.find(item => item.id === user.id);
    if (!foundUser) {
      userData.push(user);
    }
    // broadcast to all users
    io.emit('onlineUsers', userData);
  });

  client.on('disconnect', () => {
    console.log(`${JSON.stringify(currentUser, null, 2)}, disconnected...`);
    let index = userData.indexOf(currentUser);
    userData.splice(index, 1);
    io.emit('end', userData);
  });
});

module.exports = app;
