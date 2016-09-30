var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/'));


var user =
  [{
    id: 1,
    name: 'Masterdo',
    color: 'linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)',
    colorAlias : 'red'
  },
    {
      id: 2,
      name: 'Hudda',
      color: 'linear-gradient(135deg, rgba(255,174,39,1) 0%,rgba(222,73,109,1) 100%)',
      colorAlias : 'green'
    }];

var i = 0;
var interval;
var currentLockFlag = 0;
var loggedInUser;
var currentUser = user[0];

startPoll();

// swipes between current user
function startPoll() {
  interval = setInterval(poll, 5000);
}

// Assigns current user who has accquired lock
function poll(cellObj) {
  currentLockFlag++;
  if (currentLockFlag == 2) {
    currentLockFlag = 0;
  }
  var currentUserObj = {
    currentUser : user[currentLockFlag],
    cellObj : cellObj
  }
  io.emit('lightboard', currentUserObj);
  clearInterval(interval);
  startPoll();
}

// Loads index file
app.get('/', function (req, res) {
  res.sendFile(__dirname + 'index.html');
});

app.get('/currentUser', function (req, res) {
  loggedInUser = assignUser();
  poll();
   res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  res.send(loggedInUser);
})

// var nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket){
//   console.log('someone connected');
//   nsp.emit('shubh', 'everyone!');
//   socket.on('shubh', function (msg) {
//     console.log('getting response');
//     poll(msg);
//   });
// });




io.on('connection', function (socket) {
  console.log('reaching')
  poll();
  socket.on('lightboard', function (msg) {
    console.log('getting response');
    poll(msg);
  });
  
});



function assignUser() {
  if (i == 2) {
    i = 0;
  }
  var loggedInUser = user[i];
  i++;
  return loggedInUser;
}

http.listen(3010, function () {
  console.log('listening on *:3010');
});