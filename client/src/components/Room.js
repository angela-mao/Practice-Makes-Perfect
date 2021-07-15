import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import Video from "./Video";
import {getRandomQues} from '../api/QuestionAPI';
import Header from "./Header";
import QuestionText from "./QuestionText";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Room.css";

const Room = () => {
  const { code } = useParams();
  const { me, questionId, joinRoom, updateQuestion, setQuestionId } = useContext(SocketContext);
  const [selectedTags, setTags] = useState({tagIDs: [], tags: []});
  const [question, setQuestion] = useState({QuestionID: 0, Question: 'Press the "New Question" button', Tag: 'None'});


  useEffect(() => {
    console.log("joining " + code);
    joinRoom(code);
  }, [code, joinRoom]);


  const handleSelect = () => {
      getRandomQues(selectedTags.tagIDs)
          .then(response => setQuestion(response))
  }

  const updateQuestionHandler = () => {
    // Pass user's question Id
    let questionId = Math.floor(Math.random() * 1000);
    setQuestionId(questionId);
    updateQuestion(questionId);
  }

  return (
    <div>
      <Header tags={selectedTags} onClick={setTags}/>
      <div className="main">
        <h1>
          Room
        </h1>
        <div>
          Room code: {code}
        </div>
        <div>
          Socket id: {me}
        </div>
        <div>
          Question id: {questionId ? questionId : 'no question'}
        </div>
        <QuestionText questionText={question}/>
        <div>
            <button type="button" onClick={handleSelect}>New Question</button>
        </div>
        <div>
            <button type="button" onClick={updateQuestionHandler}>Update Question test</button>
        </div>
        <Video />
      </div>
    </div>
  )
}

export default Room;