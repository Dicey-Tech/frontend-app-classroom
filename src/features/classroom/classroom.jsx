import React, { useEffect } from 'react';
import {
  Nav, Container, Col, Row, Navbar,
} from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';
import ClassroomHeader from '../../components/ClassroomHeader';
import Enrollment from '../enrollment/enrollment';
import Courses from '../courses/courses';
import { fetchClassroomByUuid } from './classroomSlice';

const Classroom = (props) => {
  const classroomIdParam = props.classroomId;

  // const classroomId = useSelector(state => state.classroom.classroomId);
  const classroomStatus = useSelector(state => state.classroom.status);
  const classroomTitle = useSelector(state => state.classroom.title);
  const dispatch = useDispatch();

  useEffect(() => {
    /* check status of data here. if fetching or empty than send the dispatch */
    /* if the classroomId in the store is different than the one in the params than */
    /* it's a new classroom . Reload                                                */
    if (classroomStatus === 'initial') { dispatch(fetchClassroomByUuid(classroomIdParam)); }
  }, [classroomStatus, classroomIdParam, dispatch]);

  return (
    <>
      <ClassroomHeader title={classroomTitle} />
      <Navbar bg="light" expand="lg" className="mb-3">
        <Nav>
          <Nav.Item>
            <Nav.Link eventKey="1" href="/">
              New Classroom
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      <Container>
        <Row>
          <Col sm={3} md={4}>
            <Enrollment />
          </Col>
          <Col sm={0} md={1} />
          <Col>
            <Container>
              <Courses />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Classroom;
