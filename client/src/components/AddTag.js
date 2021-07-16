import React, {useRef, useState} from "react";
import {addTag, deleteTag} from "../api/TagAPI";

const AddTag = () => {
    const [inputVal, setInputVal] = useState('');
    const tagInput = useRef('');

    const handleAdd = () => {
        tagInput.current.value='';
        addTag(inputVal);
    }

    // const handleDelete = () => {
    //     tagInput.current.value = '';
    //     deleteTag(inputVal);
    // }

    return (
        <div>
            <input type="text" ref={tagInput} onChange={event => setInputVal(event.target.value)}/>
            <button type="button" onClick={handleAdd}>Add Tag</button>
            {/*<button type="button" onClick={handleDelete}>Delete Tag</button>*/}
        </div>
    )
}

export default AddTag;

