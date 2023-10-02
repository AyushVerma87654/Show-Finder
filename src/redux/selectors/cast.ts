import { createSelector } from "reselect";
import { State } from "../store";

export function castStateSelector(state: State) {
  return state.cast;
}

export const castSelector = createSelector(
  castStateSelector,
  (castState) => castState.cast
);

export const showIdSelector = createSelector(
  castStateSelector,
  (castState) => castState.showId
);
export const idCastSelector = createSelector(
  castStateSelector,
  (castState) => castState.idCast
);

export const castLoadingSelector = createSelector(
  castStateSelector,
  (castState) => castState.loading
);
