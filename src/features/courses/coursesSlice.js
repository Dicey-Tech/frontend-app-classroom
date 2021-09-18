import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import ClassroomApiService from '../../app/services/ClassroomApiService';
import LmsApiService from '../../app/services/LmsApiService';

const initialState = {
  courses: [],
  startFetching: false,
  status: 'initial', // initial, pending, updating, success, fail
};

export const fetchCoursesForClassroom = createAsyncThunk('courses/fetchCourses', async (classroomId) => {
  const response = await ClassroomApiService.fetchClassroomCourses(classroomId);
  console.log(response.data, 'courses response');
  // have to make a request to get the classroom details for each course
  try {
    /* eslint-disable no-restricted-syntax  */
    /* eslint-disable no-await-in-loop */
    for (const courseData of response.data.courses) {
      console.log(courseData, 'fetching for');
      const courseInfo = await LmsApiService.fetchCourseInfo(courseData.courseId);
      console.log(courseInfo, 'course data recieved');
      courseData.title = courseInfo.data.title;
      courseData.description = courseInfo.data.description;
      courseData.imageURL = courseInfo.data.imageURL;
    }
    /* eslint-enable no-await-in-loop */
    /* eslint-enable no-restricted-syntax  */
  } catch (error) {
    /* an empty catch block */
  }
  console.log(response.data, 'full course data');
  return response.data;
});

export const addCourseToClassroom = createAsyncThunk('courses/addCourse', async ({ Uuid, courseId }) => {
  const response = await ClassroomApiService.addCourseToClassroom(Uuid, courseId);
  const courseInfo = await LmsApiService.fetchCourseInfo(response.data.course.courseId);
  const result = {
    courseId: courseInfo.data.courseId,
    active: response.data.course.active,
    title: courseInfo.data.title,
    description: courseInfo.data.description,
    imageURL: courseInfo.data.imageURL,
  };
  return result;
});

export const archiveCourseInClassroom = createAsyncThunk('courses/archiveCourse', async () => {
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchCoursesForClassroom.pending, (state) => {
      state.startFetching = true;
      state.status = 'pending';
    })
      .addCase(fetchCoursesForClassroom.fulfilled, (state, action) => {
        state.startFetching = false;
        state.courses = [...action.payload.courses]; /* TODO map data rather than clone */
        state.status = 'success';
      })
      .addCase(addCourseToClassroom.fulfilled, (state, action) => {
        // should check if the course already exists.. if
        // it does than ignore?? or replace. we replace
        state.startFetching = false;
        state.status = 'success';
        const course = action.payload;
        const existingCourse = state.courses.find(x => x.courseId === course.courseId);
        if (existingCourse) {
          existingCourse.title = course.title;
          existingCourse.description = course.description;
          existingCourse.imageURL = course.imageURL;
        } else {
          state.courses.push({
            courseId: course.courseId,
            title: course.title,
            description: course.description,
            imageURL: course.imageURL,
          });
        }
      })
      .addCase(archiveCourseInClassroom.fulfilled, (state, action) => {
        state.startFetching = false;
        state.status = 'error';
        const existingCourse = state.courses.find(x => x.courseId === action.payload.courseID);
        if (existingCourse) {
          existingCourse.archived = true; /* TODO Read from data? */
        } else {
          /* TODO: can either do nothing or put up an error? */
          state.error = { code: 'some error yet to be determined' };
        }
      })
      .addMatcher(isAnyOf(addCourseToClassroom.pending, archiveCourseInClassroom.pending), (state) => {
        state.startFetching = true;
        state.status = 'updating';
      });
  },
});

export default coursesSlice.reducer;
