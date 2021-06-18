import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function getMsg() {
  return fetch("http://localhost:3000/api").then((data) => data.json());
}

function App() {
  // demo component
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let mounted = true;
    getMsg().then((msg) => {
      if (mounted) {
        setMsg(msg.message);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Calling localhost:3000/api</p>
        <p>{msg}</p>
      </header>
    </div>
  );
}

export default App;
