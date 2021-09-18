import React from 'react';
import { Scrollable, useToggle, Button } from '@edx/paragon';
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
      <Button onClick={open}>Add Course</Button>
      <AddCourseDialog isOpen={isOpen} close={close} />
      <Scrollable>
        {courseCards}
      </Scrollable>
    </>
  );
};

export default Courses;
