import React, { createContext, useState, useRef, useEffect, useCallback} from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const socket = io('http://localhost:3002');

const ContextProvider = ({ children }) => {
  const [me, setMe] = useState('');
  const [questionId, setQuestionId] = useState('');

  useEffect(() => {
    socket.on('me', (id) => {setMe(id); console.log(id);});

    socket.on('message', (msg) => {console.log(msg)});

    socket.on('join', (socketId) => {
      socket.emit('room-info', socketId, questionId);
    });

    socket.on('new-question', (questionId) => setQuestionId(questionId));
  });

  const joinRoom = useCallback((roomId) => {
    socket.emit("joinRoom", roomId);
  }, [])

  const updateQuestion = (id) => {
    socket.emit("updateQuestion", id);
  }

  return (
    <SocketContext.Provider value={{
      me,
      questionId,
      joinRoom,
      updateQuestion,
      setQuestionId
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext }