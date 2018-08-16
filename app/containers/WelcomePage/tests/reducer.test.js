import { fromJS } from 'immutable';
import welcomePageReducer from '../reducer';

describe('welcomePageReducer', () => {
  it('returns the initial state', () => {
    expect(welcomePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
