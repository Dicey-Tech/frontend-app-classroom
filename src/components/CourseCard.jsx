import React from 'react';
import {
  Card, Image, Button, Container,
} from '@edx/paragon';

/* TODO replace this with out own layout */
const CourseCard = (props) => (
  <Card className="shadow-sm course-card">
    <Card.Body>
      <Container className="course-content">
        <div className="d-flex">
          <div>
            <Image className="course-image" src={props.imageURL} fluid />
          </div>
          <div className="course-description flex-grow-1 w-100 m-2">
            <h3>{props.title}</h3><br />
            <p>{props.description}</p>
          </div>
          <div className="course-actions flex-shrink-1 justify-content-end">
            <div className="flex-column ">
              <div className="m-1"><Button variant="primary">Grades</Button></div>
              <div className="m-1"><Button variant="secondary">Archive</Button></div>
            </div>
          </div>
        </div>
      </Container>
    </Card.Body>
  </Card>
);

export default CourseCard;
