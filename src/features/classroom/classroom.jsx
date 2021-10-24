import React, { useEffect } from 'react';
import {
  Container, Col, Row,
} from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';
import ClassroomHeader from '../../components/ClassroomHeader';
import Enrollment from '../enrollment/enrollment';
import Courses from '../courses/courses';
import { fetchClassroomByUuid } from './classroomSlice';
import NavigationBar from '../../components/NavigationBar';

const Classroom = (props) => {
  const classroomTitle = useSelector(state => state.classroom.title);
  const classroomId = useSelector(state => state.classroom.classroomId);
  const dispatch = useDispatch();

  useEffect(() => {
    /* check status of data here. if fetching or empty than send the dispatch */
    /* if the classroomId in the store is different than the one in the params than */
    /* it's a new classroom . Reload                                                */
    if (classroomId !== props.classroomId) { dispatch(fetchClassroomByUuid(props.classroomId)); }
  }, [props.classroomId, classroomId, dispatch]);

  return (
    <>
      <ClassroomHeader title={classroomTitle} />
      <NavigationBar slug={props.slug} />
      <Container className="pt-3 pb-3">
        <Row className="d-flex justify-content-between">
          <Col sm={3} md={4} className="flex-shrink-1">
            <Enrollment />
          </Col>
          <Col sm={6} md={8}>
            <Courses />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Classroom;
