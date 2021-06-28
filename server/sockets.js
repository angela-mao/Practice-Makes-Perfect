// store rooms
let rooms = {}

function genRoomCode() {
  let codeLength = 0;
  let lower = 'abcdefghjkmnpqrstuvwxyz';
  let upper = 'ABCDEFGHJKMNPQRSTUVWXYZ';
  let num = '23456789';
  let all = lower + upper + num;

  let code = '';
  for (let i = 0, n = all.length; i < codeLength; ++i) {
    code += all.charAt(Math.floor(Math.random() * n));
  }

  return code;
}

module.exports = function(io) {
  io.on('connection', async (socket) => {
    socket.emit('me', socket.id);
  
    socket.on('newRoom', () => {
      let roomCode = genRoomCode();
      while (roomCode in rooms) {
        roomCode = genRoomCode();
      }
      rooms[roomCode] = {
        roomName: roomCode,
        clients: [socket.id]
      }
    });

    socket.on('joinRoom', () => {

    })
  })
};

