import axios from "axios";

export function getRandomQues(selectedTags) {
   return axios.post('/random', {TagIDs: selectedTags}).then(response => response.data);
}

export function addQuestion(question, tags) {
   return axios.post('/question', {question: question, tagIDs: tags});
}
