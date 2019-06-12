require('dotenv').config();
const port = process.env.PORT || 80;

const io = require('socket.io')(port);
const fs = require('fs');

io.origins((origin, callback) => {
  if (
    origin !== 'https://graffiti-wall.netlify.com/' ||
    origin !== 'http://localhost:3000/'
  ) {
    return callback('origin not allowed', false);
  }
  callback(null, true);
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
