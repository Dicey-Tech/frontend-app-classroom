import React, { useEffect } from 'react';
import { useParams, withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Classroom from '../features/classroom/classroom';
import { fetchEnterpriseFromSlug } from '../features/enterprise/enterpriseSlice';

const ClassroomContainer = () => {
  const { slug, classroomId } = useParams();
  const dispatch = useDispatch();
  const status = useSelector(store => store.enterprise.status);

  useEffect(() => {
    if (status === 'initial') {
      dispatch(fetchEnterpriseFromSlug(slug));
    }
  }, [slug, dispatch]);

  return (
    <Classroom classroomId={classroomId} slug={slug} />
  );
};
/* need to add a useEffect here to load the enterprise before it loads the classroom, or things
   will fail */
export default withRouter(ClassroomContainer);
