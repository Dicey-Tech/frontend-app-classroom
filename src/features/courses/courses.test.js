import reducer, { fetchCoursesForClassroom } from './coursesSlice';

const initialState = {
  courses: [],
  startFetching: false,
  status: 'initial',
};

const initialTestingState = {
  courses: [
    {
      courseId: 0,
      title: 'course 1',
      description: 'this is course 1',
      imageURL: 'iconic.jpg',
    },
    {
      courseId: 1,
      title: 'course 2',
      description: 'this is course 2',
      imageURL: 'demonic.jpg',
    },
  ],
  startFetching: false,
  status: 'initial',
};

describe('Get list of project in current classroom', () => {
  it('has initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('updates fetch projects request state', () => {
    const expected = {
      ...initialState,
      startFetching: true,
      status: 'pending',
    };
    expect(reducer(undefined, {
      type: fetchCoursesForClassroom.pending,
    })).toEqual(expected);
  });
  it('loads the projects success', () => {
    const expected = {
      ...initialTestingState,
      startFetching: false,
      status: 'success',
    };
    expect(reducer(undefined, {
      type: fetchCoursesForClassroom.fulfilled,
      payload: {
        courses: [
          {
            courseId: 0,
            title: 'course 1',
            description: 'this is course 1',
            imageURL: 'iconic.jpg',
          },
          {
            courseId: 1,
            title: 'course 2',
            description: 'this is course 2',
            imageURL: 'demonic.jpg',
          },
        ],

      },
    })).toEqual(expected);
  });
  /*
    it('adds a new course to the projects', () => {
      const expectedResult = {};
      expectedResult.courses = initialTestingState.courses.map(o => o);
      expectedResult.courses.push({
        courseId: 3,
        title: 'course 3',
        description: 'this is course 3',
        imageURL: 'shuffle.jpg',
      });
      expectedResult.startFetching = false;
      expectedResult.status = 'success';

      expect(reducer(initialTestingState, {
        type: addCourseToClassroom.fulfilled,
        payload: {
          courseId: 3,
          title: 'course 3',
          description: 'this is course 3',
          imageURL: 'shuffle.jpg',
        },
      })).toEqual(expectedResult);
    });
    */
  /* it('it archives a course', () => {
        const expectedResult = { ...initialTestingState }
        expectedResult.courses[0].archived = false
        expect(reducer(initialTestingState, {
            type: archiveCourseInClassroom.fulfilled,
            payload: {
                courseId: 0
            }
        })).toEqual(expectedResult)
    }) */
});
