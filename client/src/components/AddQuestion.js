import React from "react";
import axios from "axios";

axios.post("/api", {
  question: "foo",
  tagIDs: ["tag1", "tag2"],
});

const AddQuestion = () => {
  return (<button>Add Q</button>)
}

export default AddQuestion;