import reducer, { fetchStudentsForClassroom, addStudentToClassroom } from './enrollmentSlice';

const initialState = {
  students: [],
  startFetching: false,
  status: 'initial',
};

const resultTestingState = {
  startFetching: false,
  status: 'success',
  students: [
    {
      studentId: 0,
      email: 'user@edx.org',
      imageUrl: 'image1.jpg',
      staff: true,
    },
    {
      studentId: 1,
      email: 'dave@edx.org',
      imageUrl: 'image2.jpg',
      staff: false,
    },
  ],
};

it('has initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});
it('fetches the students in the class', () => {
  const testPayload = {
    enrollment: [
      {
        studentId: 0,
        email: 'user@edx.org',
        imageUrl: 'image1.jpg',
        staff: true,
      },
      {
        studentId: 1,
        email: 'dave@edx.org',
        imageUrl: 'image2.jpg',
        staff: false,
      },
    ],
  };
  expect(reducer(initialState, {
    type: fetchStudentsForClassroom.fulfilled,
    payload: testPayload,
  })).toEqual(resultTestingState);
});
it('adds a new student to the class', () => {
  const studentAddResultState = {
    ...resultTestingState,
    students: resultTestingState.students.map(o => o),
    status: 'success',
  };
  const newStudent = {
    studentId: 3,
    email: 'anon@edx.org',
    staff: false,
    imageUrl: undefined,
  };
  studentAddResultState.students.push(newStudent);
  expect(reducer(resultTestingState, {
    type: addStudentToClassroom.fulfilled,
    payload: newStudent,
  })).toEqual(studentAddResultState);
});
/* Enrollment cannot be amended so remove this test
it('deactivates a student', () => {
  const studentDeactivateResultState = {
    ...resultTestingState,
    status: 'success',
  };
  studentDeactivateResultState.students = resultTestingState.students.map((o) => ({
    studentId: o.studentId,
    firstName: o.firstName,
    lastName: o.lastName,
    email: o.email,
    active: o.active,
    imageURL: o.imageURL,
  }));

  studentDeactivateResultState.students[0].active = false;
  expect(reducer(resultTestingState, {
    type: toggleStudentStatusInClassroom.fulfilled,
    payload: { studentId: 0 },
  })).toEqual(studentDeactivateResultState);

}); */
