import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the welcomePage state domain
 */

const selectWelcomePageDomain = state => state.get('welcomePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by WelcomePage
 */

const makeSelectWelcomePage = () =>
  createSelector(selectWelcomePageDomain, substate => substate.toJS());

export default makeSelectWelcomePage;
export { selectWelcomePageDomain };
