import {
  GET_INDIVIDUAL_SHOW,
  LOAD_INDIVIDUAL_SHOW,
} from "../actions/individualShow";
import produce from "immer";
import { Action, ActionCreator } from "../actions";
import show from "../../models/show";
import { normalize, schema } from "normalizr";
import { apiResult } from "../../models/apiResult";
import { GET_SHOWS, QUERY_UPDATE } from "../actions/shows";

export type State = {
  show: { [s: number]: show };
  query: string;
  queryShows: { [a: string]: number[] };
  loading: boolean;
};

export const initialState: State = {
  show: {},
  query: "",
  queryShows: {},
  loading: false,
};

export function showReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case GET_SHOWS:
      return produce(state, (draft) => {
        const data = action.payload as apiResult;
        console.log("data", data);
        draft.loading = false;
        let queryShows: number[] = [];
        data.map((item) => {
          draft.show = { ...draft.show, [item.show.id]: item.show };
          queryShows.push(item.show.id);
        });
        draft.queryShows[draft.query] = queryShows;
      });
    case QUERY_UPDATE:
      return produce(state, (draft) => {
        draft.query = action.payload;
        draft.loading = true;
      });
    case GET_INDIVIDUAL_SHOW:
      return produce(state, (draft) => {
        const data = action.payload as show;
        draft.show = { ...draft.show, [data.id]: data };
      });

    default:
      return state;
  }
}
