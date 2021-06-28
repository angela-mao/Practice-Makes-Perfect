import React, { useRef } from "react";
import "./App.css";

function App() {
  const inputEl = useRef(null);

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputEl.current.value);
  }

  return (
    <div className="App">
      <div className="App__Menu">
        <h1>Practice Makes Perfect</h1>
        <button>Create</button>
        <form onSubmit={handleSubmit}>
          <label className="App__Label">
            Code:
            <input type="text" name="name" ref={inputEl}/>
          </label>
          <input type="submit" value="Join" />
        </form>
      </div>

    </div>
  );
}

export default App;
