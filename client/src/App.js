import React, { useContext, useState, useRef, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import "./styles/App.css";
import { SocketContext } from "./context/SocketContext";
import Room from "./components/Room";

async function postRoom(socketId) {
  let body = {
    socketId
  }
  let res = await fetch("http://localhost:3000/room", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return res.json();
}

function App() {
  const { me } = useContext(SocketContext);
  const [roomCode, setRoomCode] = useState('');
  const inputEl = useRef(null);
  const history = useHistory();

  /* Return roomcode */
  const createRoom = async (socketId) => {
    let resJson = await postRoom(socketId);
    return resJson.roomCode;
  }

  const enterRoom = (roomCode) => {
    setRoomCode(roomCode);
    history.push("/" + roomCode);
  }

  const handleClick = async (e) => {
    let roomCode = await createRoom(me);
    console.log(roomCode);
    enterRoom(roomCode);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let roomCode = inputEl.current.value;
    enterRoom(roomCode);
  }

  const getMenu = () => {
    return (
      <div className="App__Menu">
        <h1>Practice Makes Perfect</h1>
        <button onClick={handleClick}>Create</button>
        <form onSubmit={handleSubmit}>
          <label className="App__Label">
            Code:
            <input type="text" name="name" ref={inputEl}/>
          </label>
          <input type="submit" value="Join" />
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {getMenu()}
        </Route>
        <Route path="/:code" >
          <Room />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
