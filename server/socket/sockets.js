module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.emit('me', socket.id);

    socket.on('joinRoom', (roomId) => {
      console.log(socket.id + " joining room " + roomId);
      socket.join(roomId);
    })

    socket.on('updateQuestion', (questionId) => {
      roomId = Array.from(socket.rooms)[1];
      console.log(`updating question for room ${roomId}`);
      io.to(roomId).emit('new-question', questionId);
    })
  })
};
