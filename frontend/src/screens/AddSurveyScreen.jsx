import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useCreateSurveyMutation } from '../slices/surveyApiSlice';

const AddSurveyScreen = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const [createSurvey, { isLoading: loadingCreateSurvey }] =
    useCreateSurveyMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        let payload = {
            _id: userInfo._id,
            title,
            category,
            description,
        }
        console.log(payload);
        const res = await createSurvey(payload).unwrap();
        console.log(res);
        // dispatch(setCredentials({ ...res }));
        toast.success('Survey created successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  };

  return (
    <Row>
      <Col md={6}>
        <h2>Create a New Survey</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name of Survey</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name of Survey'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='category'>
            <Form.Label>Survey Category</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='description'>
            <Form.Label>Survey Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              type='name'
              placeholder='Enter survey Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Create Survey
          </Button>
          {loadingCreateSurvey && <Loader />}
        </Form>
      </Col>
      <Col md={6}>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, quod.
        </p>
      </Col>
    </Row>
  );
};

export default AddSurveyScreen;
