import { fromJS } from 'immutable';
import listsPageReducer from '../reducer';

describe('listsPageReducer', () => {
  it('returns the initial state', () => {
    expect(listsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
