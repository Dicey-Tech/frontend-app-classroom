import React, { useEffect } from 'react';
import { withRouter, useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ClassroomForm from '../components/ClassroomForm';
import ClassroomApiService from '../app/services/ClassroomApiService';
import { fetchEnterpriseFromSlug } from '../features/enterprise/enterpriseSlice';

const NewClassroomContainer = () => {
  /* grab the enterprise UUID here from the slug if it not already there. and fill the Redux */
  const { slug } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const enterpriseStatus = useSelector(store => store.enterprise.status);
  const enterpriseUuid = useSelector(store => store.enterprise.uuid);

  useEffect(() => {
    if (enterpriseStatus === 'initial') {
      dispatch(fetchEnterpriseFromSlug(slug));
    }
  }, [slug, dispatch]);

  async function onClassroomCreated({ title }) {
    try {
      const result = await ClassroomApiService.createNewClassroom({ title, enterpriseUuid });
      history.push(`/${result.data.uuid}`);
    } catch {
      alert('an error occured while creating the classroom.');
    }
  }

  return <ClassroomForm onSuccess={onClassroomCreated} />;
};

export default withRouter(NewClassroomContainer);
