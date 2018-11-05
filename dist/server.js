'use strict';

const express = require('express');
const socketIO = require('socket.io');

var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
//var io = require('socket.io')(server);
const fs = require('fs');

const PORT = process.env.PORT || 3000;
//const INDEX = path.join(__dirname, 'index.html');
const io = socketIO(server);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/js/bundle.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/js/bundle.js'));
});
  //app.use((req, res) => res.sendFile(path.join(__dirname + '/index.html') )
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));




//server.listen(3000);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'))
  socket.on('button press', () => {console.log('button signal'); io.emit('buttonsignal', new Date(), {for: 'everyone'});});
});

setInterval(() => io.emit('time', new Date()), 1000);








// io.on('connection', (client) => {
//   client.on('subscribeToTimer', (interval) => {
//     console.log('client is subscribing to timer with interval ', interval);
//     setInterval(() => {
//       client.emit('timer', new Date());
//     }, interval);
//   });
// });
