import React from 'react';
import { Button, Form, Container } from '@edx/paragon';

const ClassroomForm = (props) => {
  const { onSuccess, currentTitle } = props; // function which redirects to the proper page.. or re-renders??
  const titleRef = React.createRef();
  const formRef = React.createRef();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // call and await API to create classroom
    // than redirect with the classroomId at the end of onSuccessURL
    console.log('Submit');
    onSuccess({ title: titleRef.current.value }); // need to get the classroomId
  };
  const handleFormReset = () => {
    // event.preventDefault()
    formRef.reset();
  };
  return (
    <Container size="md" className="md-4">
      <Form onSubmit={handleFormSubmit} onReset={handleFormReset} ref={formRef}>
        <Form.Row>
          <Form.Group controlId="formClassroomTitle">
            <Form.Label>Classroom Title</Form.Label>
            <Form.Control placeholder="Enter a title for the Class" ref={titleRef} value={currentTitle} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Button variant="primary" type="submit">
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
