import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {SocketContext} from "../context/SocketContext";
import Header from "./Header";
import QuestionText from "./QuestionText";
import { getRandomQues } from '../api/QuestionAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Room.css";

const Room = () => {
    const {code} = useParams();
    const { questionId, joinRoom, updateQuestion } = useContext(SocketContext);

    useEffect(() => {
        console.log("joining " + code);
        joinRoom(code);
    }, [code, joinRoom]);

    const [selectedTags, setTags] = useState({tagIDs: [], tags: []});
    const [question, setQuestion] = useState({Question: 'Press the "New Question" button', Tag: 'None'});

    const handleSelect = () => {
        getRandomQues(selectedTags.tagIDs)
            .then(response => setQuestion(response))
    }

    const updateQuestionHandler = () => {
        // Pass user's question Id
        updateQuestion("1234");
    }

    return (
        <div>
            <Header tags={selectedTags} onClick={setTags}/>
            <h1>
                Room
            </h1>
            <div>
                Room code: {code}
            </div>
            <div>
                Question id: {questionId}
            </div>
            <QuestionText questionText={question}/>
            <div>
                <button type="button" onClick={handleSelect}>New Question</button>
            </div>
            <div>
                <button type="button" onClick={updateQuestionHandler}>Update Question test</button>
            </div>
        </div>
    )
}

export default Room;