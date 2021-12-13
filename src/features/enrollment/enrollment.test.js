import reducer, { fetchStudentsForClassroom } from './enrollmentSlice';

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
