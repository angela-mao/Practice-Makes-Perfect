import React from "react";
import ListTags from "./ListTags";
import { Form } from "react-bootstrap";
import "./index.css";

const AddQuestions = () => {
  return (
    <button className="add-question">
      <h1>Add Question</h1>
      <Form>
        <Form.Group>
          <Form.Label>Question</Form.Label>
          <Form.Control placeholder="Enter a Question:" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <ListTags />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tags</Form.Label>
        </Form.Group>
      </Form>
    </button>
  );
};

export default AddQuestions;
