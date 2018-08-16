import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the listsPage state domain
 */

const selectListsPageDomain = state => state.get("listsPage", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ListsPage
 */

const makeSelectListsPage = () =>
  createSelector(selectListsPageDomain, substate => substate.toJS());

export default makeSelectListsPage;
export { selectListsPageDomain };
