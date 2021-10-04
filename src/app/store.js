import { configureStore } from '@reduxjs/toolkit';
import classroomReducer from '../features/classroom/classroomSlice';
import coursesReducer from '../features/courses/coursesSlice';
import enrollmentReducer from '../features/enrollment/enrollmentSlice';
import enterpriseReducer from '../features/enterprise/enterpriseSlice';

const store = configureStore({
  reducer: {
    classroom: classroomReducer,
    courses: coursesReducer,
    enrollment: enrollmentReducer,
    enterprise: enterpriseReducer,
  },
});

export default store;
