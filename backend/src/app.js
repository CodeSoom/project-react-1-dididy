const express = require('express');
const http = require('http');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello World!' });
});

const server = http.createServer(app);
const socket = require('socket.io');

const io = socket(server);

const users = {};

io.on('connection', (requestSocket) => {
  if (!users[requestSocket.id]) {
    users[requestSocket.id] = requestSocket.id;
  }
  requestSocket.emit('yourID', requestSocket.id);
  io.sockets.emit('allUsers', users);
  requestSocket.on('disconnect', () => {
    delete users[requestSocket.id];
  });

  requestSocket.on('callUser', (data) => {
    io.to(data.userToCall).emit('hey', {
      signal: data.signalData,
      from: data.from,
    });
  });

  requestSocket.on('acceptCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

server.listen(8000, () => console.log('server is running on port 8000'));
