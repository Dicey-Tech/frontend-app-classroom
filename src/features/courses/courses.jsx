import React from 'react';
import {
  Scrollable, useToggle, Button,
} from '@edx/paragon';
import { useSelector } from 'react-redux';
import CourseCard from '../../components/CourseCard';
import AddCourseDialog from '../../components/AddCourseDialog';

const Courses = () => {
  const courses = useSelector(state => state.courses.courses);
  const [isOpen, open, close] = useToggle(false);

  const courseCards = courses.map(element => (
    <div key={element.courseId}><CourseCard
      title={element.title}
      description={element.description}
      imageURL={element.imageURL}
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
      <div>
        <Scrollable>
          {courseCards.map(element => (
            <div className="mb-2">{element}</div>
          ))}
        </Scrollable>
      </div>
    </>
  );
};

export default Courses;
