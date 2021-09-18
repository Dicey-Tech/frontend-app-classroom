import React from 'react';
import { withRouter } from 'react-router';
import Classroom from '../features/classroom/classroom';

const ClassroomContainer = ({ match }) => <Classroom classroomId={match.params.classroomId} />; // ??

export default withRouter(ClassroomContainer);
