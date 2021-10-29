import reducer, { clear } from './enterpriseSlice';

const initialState = {
  slug: null,
  uuid: null,
  name: null,
  id: null,
  status: 'initial', /* loading, reset, error, loaded */
};

const resultingState = {
  slug: 'default',
  uuid: '1234567890',
  name: 'Test School',
  id: '1',
  status: 'loaded', /* loading, reset, error, loaded */
};

it('has initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});
it('fetches enterprise data', () => {
  expect(reducer(initialState, {
    type: 'enterprise/fetchEnterpriseFromSlug/fulfilled',
    payload: resultingState,
  })).toEqual(resultingState);
});
it('clears the data', () => {
  expect(reducer(resultingState, {
    type: clear,
  })).toEqual(initialState);
});
