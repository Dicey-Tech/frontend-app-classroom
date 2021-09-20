import React from 'react';
import {
  Scrollable, useToggle, Button, Row, Col,
} from '@edx/paragon';
import { useSelector } from 'react-redux';
import CourseCard from '../../components/CourseCard';
import imageURL from '../../assets/GenericCourseImage.png';
import AddCourseDialog from '../../components/AddCourseDialog';

const Courses = () => {
  // const status = useSelector(state => state.courses.status);
  const courses = useSelector(state => state.courses.courses);
  // const classroomId = useSelector(state => state.classroom.classroomId);

  // const dispatch = useDispatch();

  /*
  useEffect(() => {
    if (status === 'initial') {
      // dispatch(fetchCoursesForClassroom(classroomId))
    }
  }, [status, classroomId, dispatch]);
  */
  const [isOpen, open, close] = useToggle(false);

  const courseCards = courses.map(element => (
    <div key={element.courseId}><CourseCard
      title={element.title}
      description={element.description}
      imageURL={imageURL}
    />
    </div>
  ));
  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <div>
          <Button onClick={open}>Add Course</Button>
        </div>
      </div>
      <AddCourseDialog isOpen={isOpen} close={close} />
      <Row>
        <Scrollable>
          {courseCards.map(element => (
            <Row className="mb-2"><Col>{element}</Col></Row>
          ))}
        </Scrollable>
      </Row>
    </>
  );
};

export default Courses;
