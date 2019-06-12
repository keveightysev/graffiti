require('dotenv').config();
const app = require('express')();
const cors = require('cors');
app.use(cors());
const http = require('http').createServer(app);
const fs = require('fs');

const io = require('socket.io')(http);

const port = process.env.PORT || 80;

http.listen(port, () => {
  console.log(`\n*** Server listening on port ${port} ***\n`);
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
