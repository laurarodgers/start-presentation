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

var state = {
	population: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}

app.use(csp({
    policies: {
        'reportOnly' : true,
        'default-src': [csp.SELF, csp.INLINE, 'videos.sproutvideo.com', 'fonts.googleapis.com', 'https:'],
        'script-src': [csp.SELF, csp.INLINE, 'sproutvideo.com', 'laurarodgers.com'],
        'media-src' : [csp.SELF, csp.INLINE, 'sproutvideo.com'],
        'style-src': [csp.SELF, csp.INLINE, 'fonts.googleapis.com', 'sproutvideo.com', 'laurarodgers.com'],
        'img-src': [csp.SELF, csp.INLINE, 'sproutvideo.com', 'https:', 'laurarodgers.com'],
        'worker-src': [csp.NONE],
        'block-all-mixed-content': false,

    }
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/js/bundle.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/js/bundle.js'));
});

// app.get('/U.jpg', function(req, res) {
//     res.sendFile(path.join(__dirname + '/U.jpg'));
// });
//
// app.get('/O.jpg', function(req, res) {
//     res.sendFile(path.join(__dirname + '/U.jpg'));
// });

app.get('/scanner-1.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/scanner-1.mp3'));
});

app.get('/airport-security-1.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/airport-security-1.mp3'));
});

app.get('/airport-gate-1.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/airport-gate-1.mp3'));
});

app.get('/restaurant-2.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/restaurant-2.mp3'));
});

app.get('/g-t-1.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/g-t-1.mp3'));
});

app.get('/dishwasher-2.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/dishwasher-2.mp3'));
});

app.get('/dishwasher-2.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/dishwasher-2.mp3'));
});

app.get('/0917.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/0917.mp3'));
});

app.get('/glass-ping.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/glass-ping.mp3'));
});

app.get('/l-c-1.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/l-c-1.mp3'));
});

app.get('/build/', function(req, res) {
    res.sendFile(path.join(__dirname + '/js/bundle.js'));
});

app.get('/styles.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/styles.css'));
});

  //app.use((req, res) => res.sendFile(path.join(__dirname + '/index.html') )
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));




//server.listen(3000);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'))
  socket.on('button press', () => {console.log('button signal'); io.emit('buttonsignal', new Date(), {for: 'everyone'});});
  socket.on('population update', (numberchange) => {
    console.log('population update');
    if (numberchange < 0) {
      state.population[Math.abs(numberchange)] = state.population[Math.abs(numberchange)] - 1;
    } else {
      state.population[numberchange] = state.population[numberchange] + 1;
    }
  })
});

setInterval(() => io.emit('time', new Date(), {for: 'everyone'}), 500);
setInterval(() => io.emit('population', state.population, {for: 'everyone'}), 500);








// io.on('connection', (client) => {
//   client.on('subscribeToTimer', (interval) => {
//     console.log('client is subscribing to timer with interval ', interval);
//     setInterval(() => {
//       client.emit('timer', new Date());
//     }, interval);
//   });
// });
