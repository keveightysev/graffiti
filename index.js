require('dotenv').config();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');

const port = process.env.PORT || 4000;

server.listen(port);

app.get('/', (req, res) => {
  res.send(`
  <h1>This is my server</h1>
  <h2>There are others like it but this one is mine</h2>
  `);
});

io.on('connection', socket => {
  socket.on('spray', data => {
    socket.emit('another spray', {
      imgArr: data.imgArr,
      x: data.x,
      y: data.y,
      width: data.width,
      dirtyX: data.dirtyX,
      dirtyY: data.dirtyY,
    });
  });
});
