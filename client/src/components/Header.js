import React, { useState } from "react";
import Tags from "./Tags";
import AddTag from "./AddTag";
import AddQuestion from "./AddQuestion";
import ListQuestions from "./ListQuestions";
import "../styles/Header.css";

function Header(props) {
  const [tags, setTags] = useState([]);

  return (
    <div className="header">
      <div className="logo">PMP</div>
      <div className="tagMenu">
        <Tags allTags={tags} setTags={setTags} onClick={props.onClick} />
      </div>
      <div className="addTag">
        <AddTag allTags={tags} setTags={setTags} />
      </div>
      <div className="addQuestion">
        <AddQuestion tagIDs={props.tags.tagIDs} />
      </div>
      <div className="listQuestions">
        <ListQuestions tagIDs={props.tags.tagIDs} />
      </div>
    </div>
  );
}

export default Header;
