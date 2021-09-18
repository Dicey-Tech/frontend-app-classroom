import reducer, { fetchStudentsForClassroom, addStudentToClassroom, toggleStudentStatusInClassroom } from './enrollmentSlice';

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
      firstName: 'ted',
      lastName: 'the man',
      email: 'user@edx.org',
      imageURL: 'image1.jpg',
      active: true,
    },
    {
      studentId: 1,
      firstName: 'frank',
      lastName: 'drebben',
      email: 'dave@edx.org',
      imageURL: 'image2.jpg',
      active: true,
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
        firstName: 'ted',
        lastName: 'the man',
        email: 'user@edx.org',
        imageURL: 'image1.jpg',
        active: true,
      },
      {
        studentId: 1,
        firstName: 'frank',
        lastName: 'drebben',
        email: 'dave@edx.org',
        imageURL: 'image2.jpg',
        active: true,
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
    firstName: 'newbie',
    lastName: 'beenThere',
    email: 'anon@edx.org',
    active: true,
    imageURL: undefined,
  };
  studentAddResultState.students.push(newStudent);
  expect(reducer(resultTestingState, {
    type: addStudentToClassroom.fulfilled,
    payload: newStudent,
  })).toEqual(studentAddResultState);
});
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
});
