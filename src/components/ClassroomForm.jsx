import React from 'react';
import { useHistory } from 'react-router';
import { Button, Form, Container } from '@edx/paragon';

const ClassroomForm = (props) => {
  const { onSuccess, currentTitle } = props; // function which redirects to the proper page.. or re-renders??
  const titleRef = React.createRef();
  const formRef = React.createRef();
  const history = useHistory();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSuccess({ title: titleRef.current.value }); // need to get the classroomId
  };
  const handleFormReset = () => {
    // event.preventDefault()
    // formRef.reset();
    history.goBack();
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
