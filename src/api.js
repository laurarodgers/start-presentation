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
  //socket.emit('subscribeToTimer', 1000);
}

function subscribeToPopulation(cb) {
  console.log('population API call');
  socket.on('population', popn => cb(null, popn));
  //socket.emit('subscribeToTimer', 1000);
}

function subscribeToAbsPopn(cb) {
  socket.on('absPopulation', popn => cb(null, popn));
  //socket.emit('subscribeToTimer', 1000);
}

function subscribeToCrowdMessage(cb) {
  console.log('subscribe to crowd');
  socket.on('crowdMessage', panel => cb(null, panel));
}

function updatePopulation(numberchange) {
  socket.emit('population update', numberchange);
  console.log('population update: ' + numberchange);
  //socket.emit('subscribeToTimer', 1000);
}

function subscribeToButton(cb) {
  console.log('button subscription');
  socket.on('buttonsignal', buttonrep => {cb(null, buttonrep); console.log('button press recognized!');});
}

function pressButton() {
  socket.emit('button press');
  console.log('button pressed!');
}

export { subscribeToTimer, subscribeToAbsPopn, subscribeToButton, subscribeToCrowdMessage, subscribeToPopulation, updatePopulation, pressButton };
