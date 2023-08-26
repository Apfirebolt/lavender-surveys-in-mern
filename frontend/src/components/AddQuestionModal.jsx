import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const AddQuestionModal = (props) => {
  const [content, setContent] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        content,
      };
      console.log(payload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question to Survey</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="content">
              <Form.Label>Question Content</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name of Survey"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Add Question
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.addQuestionUtil}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddQuestionModal;
