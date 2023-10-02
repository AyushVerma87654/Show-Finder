import { createSelector } from "reselect";
import { State } from "../store";

export function showStateSelector(state: State) {
  return state.shows;
}

export const showSelector = createSelector(
  showStateSelector,
  (showState) => showState.show
);

export const querySelector = createSelector(
  showStateSelector,
  (showState) => showState.query
);
export const queryShowSelector = createSelector(
  showStateSelector,
  (showState) => showState.queryShows
);

export const loadingSelector = createSelector(
  showStateSelector,
  (showState) => showState.loading
);

export const showMapSelector = createSelector(
  showSelector,
  querySelector,
  queryShowSelector,
  (shows, query, queryShows) => queryShows[query]?.map((item) => shows[item])
);
