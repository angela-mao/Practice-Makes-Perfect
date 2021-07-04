import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

const ListTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get("/tags").then((response) => setTags(response.data));
  }, []);

  let tagsArray = tags.map((tag) => (
    <Dropdown.Item eventKey={JSON.stringify(tag.TagID)}>
      {tag.Tag}
    </Dropdown.Item>
  ));

  const handleSelect = (e) => {
    axios
      .post("/random", { TagID: e })
      .then((response) => console.log(response.data.Question));
  };

  return (
    <DropdownButton
      alignRight
      title="Get Tags"
      id="dropdown-menu-align-right"
      drop="down"
      onSelect={handleSelect}
    >
      {tagsArray}
    </DropdownButton>
  );
};
export default ListTags;