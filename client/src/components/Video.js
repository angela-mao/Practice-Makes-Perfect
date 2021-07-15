import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import "../styles/Video.css"

const Video = () => {
  const {myVideo, otherVideo} = useContext(SocketContext);

  return (
    <div className="Video_Wrapper">
      <video className="Video" ref={myVideo} muted={true} playsInline={true} autoPlay={true} />
      <video className="Video" ref={otherVideo} playsInline={true} autoPlay={true} />
    </div>
  );
}

export default Video;