module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.emit('me', socket.id);

    socket.on('joinRoom', (roomId) => {
      console.log(socket.id + " joining room " + roomId);
    })
  })
};
