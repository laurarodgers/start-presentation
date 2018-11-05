'use strict';

const express = require('express');
const socketIO = require('socket.io');

var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
//var io = require('socket.io')(server);
const fs = require('fs');

const csp = require('express-csp-header');

const PORT = process.env.PORT || 3000;
//const INDEX = path.join(__dirname, 'index.html');
const io = socketIO(server);

app.use(csp({
    policies: {
        'default-src': [csp.SELF, 'https:'],
        'script-src': [csp.SELF, csp.INLINE, 'laurarodgers.com'],
        'media-src' : [csp.SELF],
        'style-src': [csp.SELF, 'laurarodgers.com'],
        'img-src': [csp.SELF,'https:', 'laurarodgers.com'],
        'worker-src': [csp.NONE],
        'block-all-mixed-content': true
    }
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/js/bundle.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/js/bundle.js'));
});

app.get('/kiss.jpg', function(req, res) {
    res.sendFile(path.join(__dirname + '/kiss.jpg'));
});

app.get('/glass-ping.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/glass-ping.mp3'));
});

// app.get('/build/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/js/bundle.js'));
// });
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
