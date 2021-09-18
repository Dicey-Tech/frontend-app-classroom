import React from 'react';
import {
  Card, Image, Button, Container, Row, Col,
} from '@edx/paragon';

const CourseCard = (props) => (
  <Card>
    <Card.Body>
      <Container>
        <Row>
          <Col>
            <Image src={props.imageURL} />
          </Col>
          <Col>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
          </Col>
          <Col>
            <Button>Grades</Button>
            <Button>Archive</Button>
          </Col>
        </Row>
      </Container>
    </Card.Body>
  </Card>
);

export default CourseCard;
