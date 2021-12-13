import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ClassroomApiService from '../../app/services/ClassroomApiService';
import LmsApiService from '../../app/services/LmsApiService';

const initialState = {
  courses: [],
  startFetching: false,
  status: 'initial', // initial, pending, updating, success, fail
};

export const fetchCoursesForClassroom = createAsyncThunk('courses/fetchCourses', async (classroomId) => {
  const response = await ClassroomApiService.fetchClassroomCourses(classroomId);
  const results = {
    courses: [...response.data.results],
  };
  // have to make a request to get the classroom details for each course
  /* eslint-disable no-restricted-syntax  */
  /* eslint-disable no-await-in-loop */
  for (const courseData of results.courses) {
    courseData.courseId = courseData.course_id;
    try {
      const courseInfo = await LmsApiService.fetchCourseInfo(courseData.course_id);
      courseData.title = courseInfo.data.name;
      courseData.description = courseInfo.data.short_description;
      courseData.imageURL = courseInfo.data.media.image.small;
    } catch {
      // nothing to do, just take what data we can get.
    }
  }
  /* eslint-enable no-await-in-loop */
  /* eslint-enable no-restricted-syntax  */
  return results;
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCoursesForClassroom.pending, (state) => {
      state.startFetching = true;
      state.status = 'pending';
    })
      .addCase(fetchCoursesForClassroom.fulfilled, (state, action) => {
        state.startFetching = false;
        state.courses = [...action.payload.courses]; /* TODO map data rather than clone */
        state.status = 'success';
      });
  },
});

export const { reset } = coursesSlice.actions;
export default coursesSlice.reducer;
