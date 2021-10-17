import {
  Button, CardGrid, ModalDialog, Card, Container,
} from '@edx/paragon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesForClassroom } from '../features/courses/coursesSlice';
import ImageURL from '../assets/GenericCourseImage.svg';
import ClassroomApiService from '../app/services/ClassroomApiService';

async function fetchAllCourses(classroomId) {
  const result = await ClassroomApiService.getAvailableCoursesForClassroom(classroomId);
  console.log(result, 'get list of all courses');
  return result;
}

const AddCourseDialog = ({ isOpen, close }) => {
  const classroomId = useSelector(store => store.classroom.classroomId);
  const courses = useSelector(store => store.courses.courses);
  const dispatch = useDispatch();

  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const doCall = (classroomUuid) => fetchAllCourses(classroomUuid).then(result => result.data);

      setIsLoading(true);
      doCall(classroomId).then(result => {
        setIsLoading(false);
        setCourseList(result);
      });
    }
  }, [isOpen]);

  const addCourse = async (courseId) => {
    await ClassroomApiService.addCourseToClassroom(classroomId, courseId);
    // if there is no error - TODO check for an error!
    // The result is not very rich
    dispatch(fetchCoursesForClassroom(classroomId));
    // recalculate the cards?
  };

  const courseListCards = courseList.filter((e) => courses
    .findIndex((c) => c.courseId === e/* .courseId */) < 0)
    .map((element) => (
      <Card id={element/* .courseId */} key={element/* .courseId */} style={{ width: '15em' }}>
        <Card.Img variant="top" src={ImageURL} />
        <Card.Body>
          <Card.Title>{element.title}</Card.Title>
          <Card.Text>{element.description}</Card.Text>
          <Button variant="primary" onClick={() => addCourse(element/* .courseId */)}>Add Course</Button>
        </Card.Body>
      </Card>
    ));
  return (
    <ModalDialog isOpen={isOpen} onClose={close} hasCloseButton title="Add A Course" size="lg">
      <ModalDialog.Header>
        Add A Course
      </ModalDialog.Header>
      <ModalDialog.Body>
        <Container>
          {isLoading && (<div className="text-center"><h2>Loading...</h2></div>)}
          {!isLoading && courseListCards.length === 0 && (<div className="text-center"><h2>No courses available</h2></div>)}
          {!isLoading && courseListCards.length > 0 && (
            <CardGrid columnSizes={{ sm: 10, lg: 4, xl: 4 }} style={{ width: '100%' }}>
              {courseListCards}
            </CardGrid>
          )}
        </Container>
      </ModalDialog.Body>
    </ModalDialog>
  );
};

export default AddCourseDialog;
