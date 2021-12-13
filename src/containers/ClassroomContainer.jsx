import React from 'react';
import { useParams, withRouter } from 'react-router';
import Classroom from '../features/classroom/classroom';

const ClassroomContainer = () => {
  const { classroomId } = useParams();

  return (
    <Classroom classroomId={classroomId} />
  );
};

export default withRouter(ClassroomContainer);
