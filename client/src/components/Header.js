import React from "react";
import Tags from "./Tags";
import AddTag from "./AddTag";
import AddQuestion from "./AddQuestion";
import "../styles/Header.css";

function Header(props) {
    return (
        <div className="header">
            <div className="logo">
                PMP
            </div>
            <div className="tagMenu">
                <Tags onClick={props.onClick}/>
            </div>
            <div className="addTag">
                <AddTag/>
            </div>
            <div className="addQuestion">
                <AddQuestion tagIDs={props.tags.tagIDs}/>
            </div>
        </div>
    );
};

export default Header;