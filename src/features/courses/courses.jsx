import React from 'react';
import {
  Scrollable,
} from '@edx/paragon';
import { useSelector } from 'react-redux';
import CourseCard from '../../components/CourseCard';

const Courses = () => {
  const courses = useSelector(state => state.courses.courses);

  const courseCards = courses.map(element => (
    <div key={element.courseId} className="mb-2"><CourseCard
      title={element.title}
      description={element.description}
      imageURL={element.imageURL}
    />
    </div>
  ));
  return (
    <>
      <div>
        <div><h2>Courses</h2></div>
        <Scrollable>
          {courseCards}
        </Scrollable>
      </div>
    </>
  );
};

export default Courses;
