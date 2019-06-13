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

http.listen(80, () => {
  console.log('\n*** Server listening on port 80 ***\n');
});
