const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');

app.get('/', (req, res) => {
  res.send(`
    <h1>This is my server</h1>
    <h2>There are others like it, but this one is mine</h2>
  `);
});

io.on('connection', socket => {
  socket.setMaxListeners(10000);

  socket.on('error', err => console.log(err));

  socket.on('disconnect', reason => console.log(reason));

  const imgStream = fs.createWriteStream('wall.png');

  const startImg = fs.readFileSync('wall.png');

  socket.emit('fresh', { img: startImg });

  socket.on('spray', data => {
    socket.on('err', err => console.log(err));
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
    imgStream.write(data.blob);
  });
});

const port = process.env.PORT || 80;

http.listen(port, () => console.log('*** Server listening ***'));
