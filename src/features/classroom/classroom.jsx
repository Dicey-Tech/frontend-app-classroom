import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import {
  Container, Col, Row, Navbar, Button, Image, useToggle, Icon,
} from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';
import { AddCircle } from '@edx/paragon/icons';
import ClassroomHeader from '../../components/ClassroomHeader';
import Enrollment from '../enrollment/enrollment';
import Courses from '../courses/courses';
import { fetchClassroomByUuid } from './classroomSlice';
import AddCourseIcon from '../../assets/AddCourse.svg';
import AddCourseDialog from '../../components/AddCourseDialog';

const Classroom = (props) => {
  const { slug } = props;
  const history = useHistory();
  const classroomTitle = useSelector(state => state.classroom.title);
  const classroomId = useSelector(state => state.classroom.classroomId);
  const dispatch = useDispatch();

  useEffect(() => {
    /* check status of data here. if fetching or empty than send the dispatch */
    /* if the classroomId in the store is different than the one in the params than */
    /* it's a new classroom . Reload                                                */
    if (classroomId !== props.classroomId) { dispatch(fetchClassroomByUuid(props.classroomId)); }
  }, [props.classroomId, classroomId, dispatch]);

  const [isOpen, open, close] = useToggle(false);

  return (
    <>
      <ClassroomHeader title={classroomTitle} />
      <Navbar bg="white" expand="lg" className="row justify-content-md-center">
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <Button variant="tertiary" onClick={open}>
              <Image src={AddCourseIcon} style={{ height: 24, width: 24 }} />
              &nbsp;AddCourse
            </Button>
            <AddCourseDialog isOpen={isOpen} close={close} />
          </div>
          <div className="col-md-auto align-middle">
            <Button variant="tertiary" onClick={() => history.push(`/${slug}`)} iconBefore={AddCircle}>
              New Classroom
            </Button>
          </div>
        </div>
      </Navbar>
      <Container className="bg-light pt-3">
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
