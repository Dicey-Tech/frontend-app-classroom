import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ClassroomApiService from '../../app/services/ClassroomApiService';
import { fetchCoursesForClassroom } from '../courses/coursesSlice';
import { fetchStudentsForClassroom } from '../enrollment/enrollmentSlice';
import { fetchEnterpriseFromUuid } from '../enterprise/enterpriseSlice';

const initialState = {
  title: null,
  active: null,
  classroomId: null,
  pending: false,
  schoolId: null,
  status: 'initial', /* initial,  loading, updating, success, fail */
};

export const fetchClassroomByUuid = createAsyncThunk('classroom/fetchClassroom', async (classroomId, { dispatch }) => {
  dispatch(fetchCoursesForClassroom(classroomId));
  dispatch(fetchStudentsForClassroom(classroomId));

  const response = await ClassroomApiService.fetchClassroomByUuid(classroomId);
  // get the school slug from the uuid, we need it temporarily for the add classroom button
  dispatch(fetchEnterpriseFromUuid(response.data.school));

  return response.data;
});

export const updateClassroomDetails = createAsyncThunk('classroom/updateClassroomDetails', async ({ classroomId, title, description }) => {
  const response = await ClassroomApiService.updateClassroomByUuid(classroomId, { title, description });
  return response.data; // <== should pass the title and description as payload
});

const classroomSlice = createSlice({
  name: 'classroom',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchClassroomByUuid.pending, (state) => {
      state.pending = true;
      state.status = 'loading';
    })
      .addCase(fetchClassroomByUuid.fulfilled, (state, action) => {
        const classroom = action.payload;
        state.title = classroom.name;
        state.active = classroom.active;
        state.classroomId = classroom.uuid;
        state.pending = false;
        state.schoolId = classroom.school;
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

export const { reset } = classroomSlice.actions;
export default classroomSlice.reducer;
