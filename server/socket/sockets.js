module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.emit('me', socket.id);

    socket.on('joinRoom', (roomId) => {
      console.log(socket.id + " joining room " + roomId);
      socket.join(roomId);
      // tell other people in room my id
      socket.broadcast.to(roomId).emit('join', socket.id);
    })

    socket.on('room-info', (otherId, questionId) => {
      socket.to(otherId).emit('new-question', questionId);
    })

    socket.on('updateQuestion', (questionId) => {
      roomId = Array.from(socket.rooms)[1];
      console.log(`updating question for room ${roomId} to ${questionId}`);
      socket.broadcast.to(roomId).emit('new-question', questionId);
    })
  })
};
