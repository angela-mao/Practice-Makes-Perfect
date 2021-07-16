module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.emit('me', socket.id);
    let myroom;

    socket.on('joinRoom', (roomId) => {
      console.log(socket.id + " joining room " + roomId);
      socket.join(roomId);
      myroom = roomId;
      // tell other people in room my id
      socket.broadcast.to(roomId).emit('join', socket.id);
    })

    socket.on('room-info', (otherId, questionId) => {
      socket.to(otherId).emit('other-info', socket.id);
      socket.to(otherId).emit('new-question', questionId);
    })

    socket.on('updateQuestion', (question) => {
      roomId = Array.from(socket.rooms)[1];
      console.log(`updating question for room ${roomId} to ${question.QuestionID}`);
      socket.broadcast.to(roomId).emit('new-question', question);
    })

    socket.on("disconnect", (reason) => {
      socket.broadcast.to(myroom).emit('left-room', socket.id);
    });
  })
};
