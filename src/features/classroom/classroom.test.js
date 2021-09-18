/* this is testing the reducers */
import reducer, { fetchClassroomByUuid, updateClassroomDetails } from './classroomSlice';

const initialState = {
  title: null,
  description: null,
  active: null,
  pending: false,
};

const newClassroomState = {
  ...initialState,
  title: 'a new classroom',
  description: 'a new classroom description here',
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
        title: 'a new classroom',
        description: 'a new classroom description here',
        active: true,
        classroomId: 1,
        status: 'success',
      },
    })).toEqual(newClassroomState);
  });
  it('updates classroom title and description', () => {
    const updatedClassroomState = {
      ...newClassroomState,
      title: 'updated classroom title',
      description: 'a update clasroom description',
    };
    expect(reducer(newClassroomState, {
      type: updateClassroomDetails.fulfilled,
      payload: updatedClassroomState,
    })).toEqual(updatedClassroomState);
  });
});
