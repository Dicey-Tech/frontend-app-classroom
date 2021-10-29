import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import { Button, Form, Container } from '@edx/paragon';

const ClassroomForm = (props) => {
  const { onSuccess } = props; // function which redirects to the proper page.. or re-renders??
  const titleRef = useRef();
  const formRef = useRef();
  const history = useHistory();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSuccess({ title: titleRef.current.value }); // need to get the classroomId
  };
  const handleFormReset = () => {
    history.goBack();
  };
  return (
    <Container size="md" className="md-4">
      <Form onSubmit={handleFormSubmit} onReset={handleFormReset} ref={formRef}>
        <Form.Row>
          <Form.Group controlId="formClassroomTitle">
            <Form.Label>Classroom Title</Form.Label>
            <Form.Control placeholder="Enter a title for the Class" ref={titleRef} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Button variant="primary" type="submit" className="mr-2">
            Submit
          </Button>
          <Button variant="secondary" type="reset">
            Cancel
          </Button>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default ClassroomForm;

ClassroomForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
