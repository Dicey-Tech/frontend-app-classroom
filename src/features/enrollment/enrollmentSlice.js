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
  try {
    /* eslint-disable no-restricted-syntax */
    /* eslint-disable no-await-in-loop */
    for (const studentData of response.data.enrollment) {
      console.log(studentData, 'fetching data for');
      const studentInfo = await LmsApiService.fetchStudentInfo(studentData.studentId);
      console.log(studentInfo, 'recieved student Info');
      studentData.firstName = studentInfo.data.firstName;
      studentData.lastName = studentInfo.data.lastName;
      studentData.email = studentInfo.data.email;
    }
    /* eslint-enable no-await-in-loop */
    /* eslint-eable no-restricted-syntax */
  } catch (error) {
    /* an empty catch block */
  }
  return response.data;
});
export const addStudentToClassroom = createAsyncThunk('enrollment/addStudent', () => {
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
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                imageURL: student.imageURL,
                active: student.active,
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
            firstName: newStudent.firstName,
            lastName: newStudent.lastName,
            email: newStudent.email,
            imageURL: newStudent.imageURL,
            active: newStudent.active,
          });
        })
        .addCase(toggleStudentStatusInClassroom.fulfilled, (state, action) => {
          state.startFetching = false;
          state.status = 'success';
          const studentToToggle = state.students.find(x => x.studentId === action.payload.studentId);
          if (studentToToggle) {
            studentToToggle.active = !studentToToggle.active;
          } else {
            // some type of error
          }
        });
    },

  },
);

export default enrollmentSlice.reducer;
