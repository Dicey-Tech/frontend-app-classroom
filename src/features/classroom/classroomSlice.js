import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ClassroomApiService from '../../app/services/ClassroomApiService';
import { fetchCoursesForClassroom } from '../courses/coursesSlice';
import { fetchStudentsForClassroom } from '../enrollment/enrollmentSlice';

const initialState = {
  title: null,
  description: null,
  active: null,
  classroomId: null,
  pending: false,
  status: 'initial', /* initial,  loading, updating, success, fail */
};

export const fetchClassroomByUuid = createAsyncThunk('classroom/fetchClassroom', async (classroomId, { dispatch }) => {
  console.log(classroomId, 'in the dispatch');
  const response = await ClassroomApiService.fetchClassroomByUuid(classroomId);
  // fill in data for courses here (dispatch here)?
  // fill in data for enrollment here (dispatch here)?
  await dispatch(fetchCoursesForClassroom(classroomId));
  await dispatch(fetchStudentsForClassroom(classroomId));
  console.log(response, 'dispatch response');
  return response.data;
});

export const updateClassroomDetails = createAsyncThunk('classroom/updateClassroomDetails', async ({ classroomId, title, description }) => {
  const response = await ClassroomApiService.updateClassroomByUuid(classroomId, { title, description });
  return response.data; // <== should pass the title and description as payload
});
const classroomSlice = createSlice({
  name: 'classroom',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchClassroomByUuid.pending, (state) => {
      state.pending = true;
      state.status = 'loading';
    })
      .addCase(fetchClassroomByUuid.fulfilled, (state, action) => {
        const classroom = action.payload;
        state.title = classroom.name;
        state.description = classroom.description;
        state.active = classroom.active;
        state.classroomId = classroom.uuid;
        state.pending = false;
        state.status = 'success';
      })
      .addCase(updateClassroomDetails.pending, (state) => {
        state.pending = true;
        state.status = 'updating';
      })
      .addCase(updateClassroomDetails.rejected, (state, action) => {
        state.pending = false;
        state.errorMessage = `an error occured: ${action.error}`;
        state.status = 'fail';
      })
      .addCase(updateClassroomDetails.fulfilled, (state, action) => {
        const classroomDetails = action.payload;
        state.pending = false;
        state.title = classroomDetails.title;
        state.status = 'success';
      });
  },

});

export default classroomSlice.reducer;
