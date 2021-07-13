import React from "react";
import AddQuestion from "./AddQuestion";
import Tags from "./Tags";
import "../styles/Header.css";

function Header(props) {
    return (
        <div className="header">
            <Tags onClick={props.onClick}/>
            <AddQuestion tagIDs={props.tags.tagIDs}/>
        </div>
    );
};

export default Header;