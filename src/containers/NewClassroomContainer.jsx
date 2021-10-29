import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import ClassroomForm from '../components/ClassroomForm';
import ClassroomApiService from '../app/services/ClassroomApiService';
import UserService from '../app/services/UserService';

const NewClassroomContainer = () => {
  const history = useHistory();
  const enterpriseUuid = UserService.getEnterpriseUuid();

  async function onClassroomCreated({ title }) {
    try {
      const result = await ClassroomApiService.createNewClassroom({ title, enterpriseUuid });
      history.replace(`/${result.data.uuid}`);
    } catch {
      alert('an error occured while creating the classroom.');
    }
  }

  return <ClassroomForm onSuccess={onClassroomCreated} />;
};

export default withRouter(NewClassroomContainer);
