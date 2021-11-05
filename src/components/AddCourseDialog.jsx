import PropTypes from 'prop-types';
import {
  Button, CardGrid, ModalDialog, Card, Container, Spinner,
} from '@edx/paragon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesForClassroom } from '../features/courses/coursesSlice';
import DefaultImageURL from '../assets/GenericCourseImage.svg';
import ClassroomApiService from '../app/services/ClassroomApiService';
import './AddCourseDialog.scss';

async function fetchAllCourses(classroomId) {
  const result = await ClassroomApiService.getAvailableCoursesForClassroom(classroomId);
  // mangle the return data into our standard
  const courseData = result.data.map(element => ({
    courseId: element.key,
    uuid: element.uuid,
    title: element.title,
    imageURL: element.image.src,
    description: element.short_description,
  }));
  return courseData;
}

const AddCourseDialog = ({ isOpen, close }) => {
  const classroomId = useSelector(store => store.classroom.classroomId);
  const courses = useSelector(store => store.courses.courses);
  const dispatch = useDispatch();

  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseAdding, setCourseAdding] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const doCall = (classroomUuid) => fetchAllCourses(classroomUuid);

      setIsLoading(true);
      doCall(classroomId).then(result => {
        setIsLoading(false);
        setCourseList(result);
      }).catch(() => {
        alert('An error occured finding available courses for this classroom');
        close();
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [courses, isOpen]);

  const addCourse = async (courseId) => {
    try {
      setCourseAdding(courseId);
      await ClassroomApiService.addCourseToClassroom(classroomId, courseId);
      dispatch(fetchCoursesForClassroom(classroomId));
    } catch (e) {
      alert('An error occured adding the course to the classroom.');
    } finally {
      setCourseAdding(null);
    }
  };

  const courseListCards = courseList.map((element) => (
    <Card id={element.courseId} key={element.courseId} style={{ width: '15em' }} className="add-course-card">
      <Card.Img variant="top" src={element.imageURL ? element.imageURL : DefaultImageURL} />
      <Card.Body>
        <Card.Title>{element.title}</Card.Title>
        <Card.Text>{element.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button
          variant="primary"
          onClick={() => addCourse(element.courseId)}
          disabled={courseAdding}
        >{courseAdding === element.courseId && (<><Spinner animation="border" size="sm" />&nbsp;</>)}Add Course
        </Button>
      </Card.Footer>
    </Card>
  ));

  return (
    <>
      <ModalDialog isOpen={isOpen} onClose={close} hasCloseButton title="Add A Course" size="lg">
        <ModalDialog.Header>
          Add A Course
        </ModalDialog.Header>
        <ModalDialog.Body>
          <Container>
            {isLoading && (<div className="text-center"><h2>Loading...</h2></div>)}
            {!isLoading && courseListCards.length === 0 && (<div className="text-center"><h2>No courses available</h2></div>)}
            {!isLoading && courseListCards.length > 0 && (
              <CardGrid columnSizes={{ sm: 6, m: 10, lg: 4, xl: 4 }} style={{ width: '100%' }}>
                {courseListCards}
              </CardGrid>
            )}
          </Container>
        </ModalDialog.Body>
      </ModalDialog>
    </>
  );
};

export default AddCourseDialog;

AddCourseDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
