const express = require('express'),
  cors = require('cors'),
  server = express()
    .use(cors())
    .use(express.json()),
  app = require('http').createServer(server),
  io = require('socket.io')(app, {
    path: '/spray',
    transports: ['polling'],
  });

const port = process.env.PORT || 4500;

server.listen(port);

io.on('connection', socket => {
  socket.setMaxListeners(10000);

  socket.on('error', err => console.log(err));

  socket.on('disconnect', reason => console.log(reason));

  const startImg = fs.readFileSync('wall.json');
  const data = JSON.parse(startImg);

  socket.emit('fresh', { img: data.imgData });

  socket.on('spray', data => {
    socket.on('error', err => console.log(err));
    socket.broadcast.emit('another spray', {
      imgArr: data.imgArr,
      x: data.x,
      y: data.y,
      width: data.width,
      dirtyX: data.dirtyX,
      dirtyY: data.dirtyY,
    });
  });

  socket.on('save', data => {
    const save = JSON.stringify(data);
    fs.writeFileSync('wall.json', save);
  });
});
