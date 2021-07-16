import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import "../styles/Video.css"

const Video = () => {
  const {myVideo, otherVideo} = useContext(SocketContext);

  return (
    <div className="Video_Wrapper">
      <div id="me">
        <video className="Video" ref={myVideo} muted={true} playsInline={true} autoPlay={true} />
      </div>
      <div id="other">
        <video className="Video" ref={otherVideo} playsInline={true} autoPlay={true} />
      </div>
    </div>
  );
}

export default Video;