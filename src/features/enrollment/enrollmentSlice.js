import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ClassroomApiService from '../../app/services/ClassroomApiService';
import LmsApiService from '../../app/services/LmsApiService';

const initialState = {
  students: [],
  startFetching: false,
  status: 'initial',
};
/* TODO: classroom ID could be a global to the MFE, so might not need to pass it around??
should be in REDUX store somewhere */
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
// This is the bulk student load. expects a newline (\r\n) between student emails. Check for fail
// TODO: not actually sure if this needed!!
export const addStudentToClassroom = createAsyncThunk('enrollment/addsStudent', () => {
  // fetch student info from LMS here and add to store
});
export const toggleStudentStatusInClassroom = createAsyncThunk('enrollment/toggleStudentStatus', () => {
  // toggle the state. basically !active . than update in DB and refresh the UI
});
const enrollmentSlice = createSlice(
  {
    name: 'enrollment',
    initialState,
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
        })
        .addCase(addStudentToClassroom.fulfilled, (state, action) => {
          state.startFetching = false;
          state.status = 'success';
          const newStudent = action.payload;
          state.students.push({
            studentId: newStudent.studentId,
            email: newStudent.email,
            imageUrl: newStudent.imageUrl,
            staff: newStudent.staff,
          });
        });
      /* obsolete
      .addCase(toggleStudentStatusInClassroom.fulfilled, (state, action) => {
        state.startFetching = false;
        state.status = 'success';
        const studentToToggle = state.students.find(x => x.studentId === action.payload.studentId);
        if (studentToToggle) {
          studentToToggle.active = !studentToToggle.active;
        } else {
          // some type of error
        }
      }); */
    },

  },
);

export default enrollmentSlice.reducer;
