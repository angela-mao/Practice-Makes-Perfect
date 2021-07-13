import axios from "axios";

export function getAllTags() {
    return axios.get('/tags').then(response => response.data);
}

export function addTag(inputVal) {
    console.log(inputVal);
    axios.post('/addtag', {Tag: inputVal});
}

export function deleteTag(inputVal) {
    console.log(inputVal);
    axios.post('/deletetag', {Tag: inputVal});
}

