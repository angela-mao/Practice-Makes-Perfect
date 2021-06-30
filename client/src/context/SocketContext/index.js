import React, { createContext, useState, useRef, useEffect} from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const socket = io('http://localhost:3002');

const ContextProvider = ({ children }) => {
  const [me, setMe] = useState('');

  useEffect(() => {
    socket.on('me', (id) => {setMe(id); console.log(id);});

    socket.on('message', (msg) => {console.log(msg)});
  });

  const joinRoom = (roomId) => {
    socket.emit("joinRoom", roomId);
  }

  return (
    <SocketContext.Provider value={{
      me,
      joinRoom
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext }