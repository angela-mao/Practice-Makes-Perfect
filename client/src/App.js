import React, { useContext, useState, useRef, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import "./styles/App.css";
import { SocketContext } from "./context/SocketContext";
import Room from "./components/Room";

function postRoom(socketId) {
  let body = {
    socketId
  }
  
  return fetch("http://localhost:3000/room", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((data) => data.json());
}

function App() {
  const { me } = useContext(SocketContext);
  const [roomCode, setRoomCode] = useState('');
  const inputEl = useRef(null);

  const createRoom = (socketId) => {
    postRoom(socketId).then((res) => {
      setRoomCode(res.roomCode);
    })
  }

  const handleClick = (e) => {
    createRoom(me);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setRoomCode(inputEl.current.value);
  }

  const getMenu = () => {
    if (roomCode) {
      console.log("redirect", roomCode);
      return <Redirect to={"/" + roomCode} />
    }

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
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {getMenu()}
          </Route>
          <Route path="/:code" >
            <Room />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
