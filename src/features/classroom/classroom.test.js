/* this is testing the reducers */
import reducer, { fetchClassroomByUuid, updateClassroomDetails } from './classroomSlice';

const initialState = {
  title: null,
  active: null,
  pending: false,
  status: 'initial',
};

const newClassroomState = {
  ...initialState,
  title: 'a new classroom',
  active: true,
  pending: false,
  classroomId: 1,
  status: 'success',
};

describe('fetch and update existing classroom', () => {
  it('fetches a classroom', () => {
    expect(reducer(undefined, {
      type: fetchClassroomByUuid.fulfilled,
      payload: {
        name: 'a new classroom',
        active: true,
        uuid: 1,
        status: 'success',
      },
    })).toEqual(newClassroomState);
  });
  it('updates classroom title and description', () => {
    const updatedClassroomState = {
      ...newClassroomState,
      title: 'updated classroom title',
    };
    expect(reducer(newClassroomState, {
      type: updateClassroomDetails.fulfilled,
      payload: updatedClassroomState,
    })).toEqual(updatedClassroomState);
  });
});
