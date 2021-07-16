import React, { useState, useRef, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./styles/App.css";
import { ContextProvider  } from './context/SocketContext';
import Room from "./components/Room";

async function postRoom() {
  let body = {};
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
  //const [roomCode, setRoomCode] = useState('');
  const inputEl = useRef(null);
  const history = useHistory();

  /* Return roomcode */
  const createRoom = async () => {
    let resJson = await postRoom();
    return resJson.roomCode;
  }

  const enterRoom = (roomCode) => {
    //setRoomCode(roomCode);
    history.push("/" + roomCode);
  }

  const handleClick = async (e) => {
    let roomCode = await createRoom();
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
        <button className="lobbyButtons" onClick={handleClick}>Create</button>
        <form onSubmit={handleSubmit}>
          <label className="App__Label">
            Code:
            <input type="text" name="name" ref={inputEl}/>
          </label>
          <input className="lobbyButtons" type="submit" value="Join" />
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
          <ContextProvider>
            <Room />
          </ContextProvider>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
