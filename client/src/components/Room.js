import React, { useContext, useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';

const Room = () => {
  const { code } = useParams();
  const { questionId, joinRoom, updateQuestion } = useContext(SocketContext);

  useEffect(() => {
    console.log("joining " + code);
    joinRoom(code);
  }, [code, joinRoom]);

  const [tags, setTags] = useState([]);

  useEffect(() => {
      axios.get('/tags')
          .then(response => setTags(response.data))
  }, []);

  let tagsArray = tags.map(tag => <Dropdown.Item eventKey={JSON.stringify(tag.TagID)}>{tag.Tag}</Dropdown.Item>);

  const handleSelect= (e) =>{
      axios.post('/random', {TagID: e})
          .then(response => console.log(response.data.Question));
  }

  const updateQuestionHandler = () => {
    // Pass user's question Id
    updateQuestion("1234");
  }

  return (
    <div>
      <h1>
        Room
      </h1>
      <div>
        Room code: {code}
      </div>
      <div>
        Question id: {questionId}
      </div>
        <DropdownButton
            alignRight
            title="Get Tags"
            id="dropdown-menu-align-right"
            drop="down"
            onSelect={handleSelect}
        >
            {tagsArray}
        </DropdownButton>
        <div>
          <button onClick={updateQuestionHandler}>Update Question test</button>
        </div>
    </div>
  )
}

export default Room;