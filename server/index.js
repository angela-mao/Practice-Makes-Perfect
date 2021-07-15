const express = require("express");
const bodyParser = require("body-parser");
const app = express(); // create express app
const server = require("http").createServer(app);
const cors = require("cors");

const appRoutes = require('./routes/app');
const apiRoutes = require('./routes/api');

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/', appRoutes);
app.use('/api', apiRoutes);

// socket
app.set('socketio', io);

const API_PORT = process.env.API_PORT || 3001;
const SOCKET_PORT = process.env.SOCKET_PORT || 3002;

// start express server on port
app.listen(API_PORT, () => {
  console.log(`server started on port ${API_PORT}`);
});

server.listen(SOCKET_PORT, () => {
  console.log(`socket listening on port ${SOCKET_PORT}`);
})

require('./socket/sockets')(io);
