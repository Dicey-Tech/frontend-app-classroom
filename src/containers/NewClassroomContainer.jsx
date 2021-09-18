import React from 'react';
import { withRouter } from 'react-router';
import ClassroomForm from '../components/ClassroomForm';
import ClassroomApiService from '../app/services/ClassroomApiService';

const NewClassroomContainer = ({ history }) => {
  async function onClassroomCreated({ title }) {
    // dummy call to create the class room
    const result = await ClassroomApiService.createNewClassroom({ title });
    history.push(`/${result.data.classroomId}`);
  }

  return <ClassroomForm onSuccess={onClassroomCreated} />;
};

export default withRouter(NewClassroomContainer);
