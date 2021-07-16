import React from "react";
import axios from "axios";

import "../styles/ListQuestions.css";

const ListQuestions = (props) => {
  const handleClick = () => {
    axios
      .get(`./api/listQuestions/${props.tagIDs}`)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <button type="button" onClick={handleClick}>
      List Questions
    </button>
  );
};

export default ListQuestions;
