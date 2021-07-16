import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {SocketContext} from "../context/SocketContext";
import Video from "./Video";
import {getRandomQues} from '../api/QuestionAPI';
import Header from "./Header";
import QuestionText from "./QuestionText";
import Button from 'react-bootstrap/Button';
import FileCopy from '@material-ui/icons/FileCopyOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Room.css";

const Room = () => {
    const {code} = useParams();
    const {question, joinRoom, updateQuestion, setQuestion} = useContext(SocketContext);
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

    const copyButton = () => {
        let url = window.location.origin;
        navigator.clipboard.writeText(url + '/' + code);
    }

    return (
        <div class="Room">
            <Header tags={selectedTags} onClick={setTags}/>
            <div className="main">
                <h1>
                    Interview Room
                </h1>
                <div>
                    Room code: <Button variant="outline-primary" onClick={copyButton}>{code} <FileCopy /></Button>
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