import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import AddQuestionModal from "../components/AddQuestionModal";
import Meta from "../components/Meta";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSurveyDetailsQuery,
  useUpdateSurveyMutation,
  useDeleteSurveyMutation,
} from "../slices/surveyApiSlice";

const SurveyDetailScreen = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // Modal show
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { userInfo } = useSelector((state) => state.auth);

  const { data: survey, isLoading, error } = useGetSurveyDetailsQuery(id);

  const [updateSurvey, { isLoading: loadingUpdateSurvey }] =
    useUpdateSurveyMutation();

  const [deleteSurvey, { success: deleteSurveySuccess }] =
    useDeleteSurveyMutation();

  useEffect(() => {
    if (survey) {
      setTitle(survey.title);
      setCategory(survey.category);
      setDescription(survey.description);
    }
  }, [survey]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        _id: survey._id,
        title,
        category,
        description,
      };
      console.log(payload);
      await updateSurvey(payload).unwrap();
      toast.success("Survey updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      await deleteSurvey(survey._id).unwrap();
      toast.success("Survey deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addQuestionHandler = async (e) => {
    e.preventDefault();
    console.log('Adding question ...')
  };

  console.log(survey);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={survey.title} description={survey.description} />
          <h1>Survey Detail {survey.title}</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name of Survey</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name of Survey"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="category">
              <Form.Label>Survey Category</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="description">
              <Form.Label>Survey Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="name"
                placeholder="Enter survey Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update Survey
            </Button>
            <Button
              className="mx-2"
              type="button"
              variant="danger"
              onClick={(e) => deleteHandler(e)}
            >
              Delete
            </Button>
            <Button className="mx-2" variant="primary" onClick={handleShow}>
              Add Question
            </Button>
            {loadingUpdateSurvey && <Loader />}
          </Form>

          <AddQuestionModal
            show={show}
            handleClose={handleClose}
            addQuestionUtil={addQuestionHandler}
          />
        </>
      )}
    </>
  );
};

export default SurveyDetailScreen;
