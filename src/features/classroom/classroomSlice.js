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
  status: 'initial', /* initial,  loading, updating, success, fail */
};

// this is not needed as will be done from a form which than redirects to URL/UUID which will
// fire this actions to load the data for the classroom and fire other actions to load courses and
// students!
/*
export const createClassroom = createAsyncThunk('classroom/createClassroom',
async ( title, description, schoolUuid ) => {
    const response = await classroomAPI.createClassroom({title, description, schoolUuid})
    const newClassroom = {
        title,
        description,
        schoolUuid,
        classroomUuid
    }
    //dispatch here to clear the states to students and projects linked??
    return newClassroom
})
*/
export const fetchClassroomByUuid = createAsyncThunk('classroom/fetchClassroom', async (classroomId, { dispatch }) => {
  console.log(classroomId, 'in the dispatch');
  const response = await ClassroomApiService.fetchClassroomByUuid(classroomId);
  // fill in data for courses here (dispatch here)?
  // fill in data for enrollment here (dispatch here)?
  await dispatch(fetchCoursesForClassroom(classroomId));
  await dispatch(fetchStudentsForClassroom(classroomId));
  console.log(response, 'dispatch response');
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
  extraReducers: builder => {
    /*        builder.addCase(createClassroom.fulfilled, (state, action) => {
                    const newClassroom = action.payload
                    state.courses = []
                    state.students = []
                    state.uuid = newClassroom.classroomUuid
                    state.title = newClassroom.title
                    state.description = newClassroom.description
                }) */
    builder.addCase(fetchClassroomByUuid.pending, (state) => {
      state.pending = true;
      state.status = 'loading';
    })
      .addCase(fetchClassroomByUuid.fulfilled, (state, action) => {
        const classroom = action.payload;
        state.title = classroom.name;
        // state.description = classroom.description;
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
