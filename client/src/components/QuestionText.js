import React from 'react';
import "../styles/QuestionText.css";

function QuestionText (props) {
    let tags = props.questionText.Tag;
    let question = props.questionText.Question;

    return (
        <div>
            <div className="question">
                Question: {question}
            </div>
            <div className="tags">
                Tags: {tags}
            </div>
        </div>
    )
}

export default QuestionText;