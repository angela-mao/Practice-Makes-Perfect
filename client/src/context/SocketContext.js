import React, { createContext, useState, useRef, useEffect, useCallback} from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

const SocketContext = createContext();

const SOCKET_HOST = 'http://localhost:3002';
let socket, peer;

let mediaPerms = {video: true, audio: true};

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(undefined);
  const [me, setMe] = useState('');
  const [other, setOther] = useState('');
  const [question, setQuestion] = useState({QuestionID: 0, Question: 'Press the "New Question" button', Tag: 'None'});

  const myVideo = useRef(null);
  const otherVideo = useRef(null);

  useEffect(() => {
    const getUserMedia = async () => {
      if (myVideo.current && !myVideo.current.srcObject) { // if video ref is attached
        try {
          const currentStream = await navigator.mediaDevices.getUserMedia(mediaPerms);
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
        } catch (e) {
          console.log(e, e.name);
        }
      }
    };
    getUserMedia();

    socket.on('me', (id) => {
      peer = new Peer(id);
      setMe(id);
      console.log("my id:", id);
    });

    socket.on('other-info', (otherId) => {
      console.log("got other id:", otherId);
      setOther(otherId);
    });

    const startCall = (otherId) => {
      if (peer && stream) {
        console.log("calling other");
        const call = peer.call(otherId, stream);
        console.log("call established", call);
        call.on('stream', (remoteStream) => {
          // save remote stream
          otherVideo.current.srcObject = remoteStream;
        });
      } else {
        console.log('startCall: No peer or stream');
      }
    }

    socket.on('join', (socketId) => {
      setOther(socketId);
      socket.emit('room-info', socketId, question);
      startCall(socketId);
    });

    socket.on('new-question', (question) => setQuestion(question));

    socket.on('left-room', (otherId) => {
      setOther('');
      otherVideo.current.srcObject = undefined;
    });

    //peerEventHandler();
    if (peer) {
      peer.on('open', (id) => {
        console.log('peer connection open', id);
      });

      peer.on('call', (call) => {
        navigator.mediaDevices.getUserMedia(mediaPerms)
        .then((currentStream) => {
          // save stream
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;

          call.answer(currentStream);
          call.on('stream', (remoteStream) => {
            // save remote stream
            otherVideo.current.srcObject = remoteStream;
          });
        });
      });

      // peer error event handler
      peer.on('error', (err) => {
        console.log('peer connection error', err);
      });
    } else {
      console.log('answerCall: No peer');
    }
  }, [question, stream]);

  const joinRoom = useCallback((roomId) => {
    socket = io(SOCKET_HOST);

    console.log("joining " + roomId);
    socket.emit("joinRoom", roomId);
  }, [])

  const updateQuestion = (id) => {
    socket.emit("updateQuestion", id);
  }

  return (
    <SocketContext.Provider value={{
      myVideo,
      otherVideo,
      me,
      other,
      question,
      joinRoom,
      updateQuestion,
      setQuestion
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext }