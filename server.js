const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('signal', data => {
    // Send the signal to the other peer
    socket.broadcast.emit('signal', data);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});