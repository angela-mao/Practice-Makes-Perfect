import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {SocketContext} from "../context/SocketContext";
import Video from "./Video";
import {getRandomQues} from '../api/QuestionAPI';
import Header from "./Header";
import QuestionText from "./QuestionText";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Room.css";

const Room = () => {
    const {code} = useParams();
    const {me, question, joinRoom, updateQuestion, setQuestion} = useContext(SocketContext);
    const [selectedTags, setTags] = useState({tagIDs: [], tags: []});


    useEffect(() => {
        console.log("joining " + code);
        joinRoom(code);
    }, [code, joinRoom]);


    const handleSelect = () => {
        getRandomQues(selectedTags.tagIDs)
            .then(response => {
                setQuestion(response);
                updateQuestion(response);
            })
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
                <QuestionText questionText={question}/>
                <Video/>
                <div className="newQuestion">
                    <button type="button" onClick={handleSelect}>New Question</button>
                </div>
            </div>
        </div>
    )
}

export default Room;