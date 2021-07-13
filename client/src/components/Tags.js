import React, {useEffect, useState} from 'react';
import {getAllTags} from '../api/TagAPI';
import Form from 'react-bootstrap/Form';
import "../styles/Tags.css";

function Tags(props) {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getAllTags()
            .then(response => setTags(response));
    }, []);

    let tagsArray = tags.map((tag, index) => <option key={index} value={JSON.stringify(tag.TagID)}>{tag.Tag}</option>);

    const handleSelect = (e) => {
        const selected = e.target.selectedOptions;
        const selectedTags = {tagIDs: [], tags: []};
        for (let i = 0; i < selected.length; i++) {
            selectedTags.tagIDs[i] = selected[i].value;
            selectedTags.tags[i] = selected[i].label;
        }
        props.onClick(selectedTags);
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label column="sm">Choose Tags</Form.Label>
                    <Form.Control as="select" multiple onChange={handleSelect} size="sm">
                        {tagsArray}
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Tags;