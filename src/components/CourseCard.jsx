import React from 'react';
import {
  Card, Image, Button, Container,
} from '@edx/paragon';

/* className="row-cols-3" */
const CourseCard = (props) => (
  <Card>
    <Card.Body>
      <Container>
        <div className="d-flex">
          <div>
            <Image src={props.imageURL} fluid />
          </div>
          <div className="flex-grow-1 w-100">
            <h3>{props.title}</h3><br />
            <p>{props.description}</p>
          </div>
          <div className="flex-shrink-1 justify-content-end">
            <div className="flex-column ">
              <div className="m-1"><Button>Grades</Button></div>
              <div className="m-1"><Button>Archive</Button></div>
            </div>
          </div>
        </div>
      </Container>
    </Card.Body>
  </Card>
);

export default CourseCard;
