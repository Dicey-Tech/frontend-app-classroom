import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import {
  Container, Col, Row, Navbar, Button, Image, useToggle,
} from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClassroomHeader from '../../components/ClassroomHeader';
import Enrollment from '../enrollment/enrollment';
import Courses from '../courses/courses';
import { fetchClassroomByUuid } from './classroomSlice';
import AddCourseIcon from '../../assets/AddCourse.svg';
import AddCourseDialog from '../../components/AddCourseDialog';

const Classroom = (props) => {
  const { slug, classroomId } = props;
  const history = useHistory();
  const classroomStatus = useSelector(state => state.classroom.status);
  const classroomTitle = useSelector(state => state.classroom.title);
  const dispatch = useDispatch();

  useEffect(() => {
    /* check status of data here. if fetching or empty than send the dispatch */
    /* if the classroomId in the store is different than the one in the params than */
    /* it's a new classroom . Reload                                                */
    if (classroomStatus === 'initial') { dispatch(fetchClassroomByUuid(classroomId)); }
  }, [classroomStatus, classroomId, dispatch]);

  const [isOpen, open, close] = useToggle(false);

  return (
    <>
      <ClassroomHeader title={classroomTitle} />
      <Navbar bg="white" expand="lg" className="row justify-content-md-center">
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <Button variant="tertiary" onClick={open}><Image src={AddCourseIcon} />&nbsp;AddCourse</Button>
            <AddCourseDialog isOpen={isOpen} close={close} />
          </div>
          <div className="col-md-auto">
            <Button variant="tertiary" onClick={() => history.push(`/${slug}`)}><FontAwesomeIcon icon={faPlusCircle} />&nbsp;New Classroom</Button>
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
