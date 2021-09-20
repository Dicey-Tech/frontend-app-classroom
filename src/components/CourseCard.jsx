import React from 'react';
import {
  Card, Image, Button, Container, Row, Col,
} from '@edx/paragon';

const CourseCard = (props) => (
  <Card>
    <Card.Body>
      <Container>
        <Row className="row-cols-3">
          <Col>
            <Image src={props.imageURL} />
          </Col>
          <Col>
            <h2>{props.title}</h2><br />
            <p>{props.description}</p>
          </Col>
          <Col>
            <div className="d-flex justify-content-end">
              <Button className="mr-2">Grades</Button>
              <Button>Archive</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Card.Body>
  </Card>
);

export default CourseCard;
