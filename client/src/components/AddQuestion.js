import React, {useRef, useState} from "react";
import { addQuestion } from '../api/QuestionAPI';

function AddQuestion(props) {
    const [inputVal, setInputVal] = useState('');
    const quesInput = useRef('');

    const handleClick = () => {
        quesInput.current.value='';
        addQuestion(inputVal, props.tagIDs);
    }

    return (
        <div>
            <input type="text" ref={quesInput} onChange={event => setInputVal(event.target.value)} />
            <button type="button" onClick={handleClick}>Add Question</button>
        </div>
    )
}

export default AddQuestion;