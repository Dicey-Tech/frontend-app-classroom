import React from 'react';
import { useSelector } from 'react-redux';
import CourseCard from '../../components/CourseCard';

const Courses = () => {
  const courses = useSelector(state => state.courses.courses);

  const courseCards = courses.map(element => (
    <div key={element.courseId} className="mb-2"><CourseCard
      title={element.title}
      description={element.description}
      imageURL={element.imageURL}
      courseId={element.courseId}
    />
    </div>
  ));
  return (
    <>
      <div>
        <div><h2>Courses</h2></div>
        {courseCards}
      </div>
    </>
  );
};

export default Courses;
