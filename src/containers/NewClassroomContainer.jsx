import React, { useEffect } from 'react';
import { withRouter, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ClassroomForm from '../components/ClassroomForm';
import ClassroomApiService from '../app/services/ClassroomApiService';
import { fetchEnterpriseFromSlug } from '../features/enterprise/enterpriseSlice';

const NewClassroomContainer = ({ history }) => {
  /* grab the enterprise UUID here from the slug if it not already there. and fill the Redux */
  const { slug } = useParams();
  const dispatch = useDispatch();
  const enterpriseStatus = useSelector(store => store.enterprise.status);
  const enterpriseUuid = useSelector(store => store.enterprise.uuid);

  useEffect(() => {
    if (enterpriseStatus === 'initial') {
      dispatch(fetchEnterpriseFromSlug(slug));
    }
  }, [slug, dispatch]);

  async function onClassroomCreated({ title }) {
    // dummy call to create the class room
    const result = await ClassroomApiService.createNewClassroom({ title, enterpriseUuid });
    // TODO: need to check for error here - 404 etc..
    history.push(`/${slug}/${result.data.uuid}`);
  }

  return <ClassroomForm onSuccess={onClassroomCreated} />;
};

export default withRouter(NewClassroomContainer);
