import { configureStore } from '@reduxjs/toolkit';
import classroomReducer from '../features/classroom/classroomSlice';
import coursesReducer from '../features/courses/coursesSlice';
import enrollmentReducer from '../features/enrollment/enrollmentSlice';

const store = configureStore({
  reducer: {
    classroom: classroomReducer,
    courses: coursesReducer,
    enrollment: enrollmentReducer,
  },
});

export default store;
