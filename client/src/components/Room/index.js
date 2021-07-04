import React, { useContext, useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import Header from "../Header/index.js"

const Room = () => {
  const { code } = useParams();
  const { joinRoom } = useContext(SocketContext);

  useEffect(() => {
    console.log("joining " + code);
    joinRoom(code);
  }, [code, joinRoom]);

  return (
    <div>
      <Header />
      <h1>
        Room
      </h1>
      <div>
        Room code: {code}
      </div>
    </div>
  )
}

export default Room;