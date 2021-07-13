import React from "react";
import Tags from "./Tags";
import AddTag from "./AddTag";
import AddQuestion from "./AddQuestion";
import "../styles/Header.css";

function Header(props) {
    return (
        <div className="header">
            <Tags onClick={props.onClick}/>
            <AddTag />
            <AddQuestion tagIDs={props.tags.tagIDs}/>
        </div>
    );
};

export default Header;