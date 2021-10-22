import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ClassroomApiService from '../../app/services/ClassroomApiService';
import LmsApiService from '../../app/services/LmsApiService';

const initialState = {
  students: [],
  startFetching: false,
  status: 'initial',
};
export const fetchStudentsForClassroom = createAsyncThunk('enrollment/fetchStudents', async (classroomId) => {
  // multi step fetch here. will need to fetch the list of students than fetch each student info
  // from LMS
  const response = await ClassroomApiService.fetchClassroomEnrollment(classroomId);
  console.log(response.data, 'enrollment');
  const results = {
    enrollment: [...response.data.results],
  };
  /* eslint-disable no-restricted-syntax */
  for (const student of results.enrollment) {
    student.studentId = student.pk;
    student.email = student.user_id;
    try {
      /* eslint-disable no-await-in-loop */
      // for (const studentData of response.data.enrollment) {
      console.log(student, 'fetching data for');
      const studentInfo = await LmsApiService.fetchStudentInfoByEmail(student.email);
      console.log(response, 'recieved student Info');
      student.imageUrl = studentInfo.data[0].profile_image.image_url_small;
      /* eslint-enable no-await-in-loop */
    } catch (error) {
      /* an empty catch block */
    }
  }
  /* eslint-eable no-restricted-syntax */
  return results;
});

const enrollmentSlice = createSlice(
  {
    name: 'enrollment',
    initialState,
    reducers: {
      reset() {
        return initialState;
      },
    },
    extraReducers: builder => {
      builder.addCase(fetchStudentsForClassroom.pending, (state) => {
        // state = initialState
        state.startFetching = true;
        state.status = 'pending';
      })
        .addCase(fetchStudentsForClassroom.fulfilled, (state, action) => {
          state.students = [];
          const studentList = action.payload.enrollment;
          studentList.forEach(student => {
            state.students.push(
              {
                studentId: student.studentId,
                imageUrl: student.imageUrl,
                staff: student.staff,
                email: student.email,
              },
            );
          });
          state.startFetching = false;
          state.status = 'success';
        });
    },

  },
);

export const { reset } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
