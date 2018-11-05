//var app = require('express')();
//var http = require('http').Server(app);
import io from 'socket.io-client';
//var io = require('socket.io')(http)
 var socket = io();
//const socket = io('localhost:3000');


//var io = require('socket.io')(http)
//var io = require('socket.io')(app);
//const socket = openSocket('http://localhost:3000');
//const PORT = process.env.PORT || 3000;
//var socket = io();


function subscribeToTimer(cb) {
  console.log('time API call!');
  socket.on('time', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function subscribeToButton(cb) {
  console.log('button subscription');
  socket.on('buttonsignal', buttonrep => {cb(null, buttonrep); console.log('button press recognized!');});
}

function pressButton() {
  socket.emit('button press', {for: 'everyone'});
  console.log('button pressed!');
}

export { subscribeToTimer, subscribeToButton, pressButton };
