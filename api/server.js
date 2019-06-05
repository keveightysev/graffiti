const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const blob = require('./blob.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/', blob);

server.get('/', (req, res) => {
  res.send(`
        <h1>This is my server</h1>
        <h2>There are others like it but this one is mine</h2>
    `);
});

module.exports = server;
