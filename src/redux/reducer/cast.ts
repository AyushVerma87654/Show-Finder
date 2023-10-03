import { apiResult } from "./../../models/apiResult";
import { castObject } from "./../../models/castObject";
import { CAST_LOADED, GET_CAST } from "./../actions/cast";
import produce from "immer";
import { Action } from "../actions";
import { normalize, schema } from "normalizr";
import { cast } from "../../models/cast";
import { GET_SHOWS } from "../actions/shows";

export type State = {
  cast: castObject;
  showId: number;
  idCast: { [a: number]: number[] };
  loading: boolean;
};

export const initialState: State = {
  cast: {},
  showId: 0,
  idCast: {},
  loading: false,
};

export function castReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case CAST_LOADED:
      return produce(state, (draft) => {
        const data = action.payload as cast[];
        let idShows: number[] = [];
        console.log(data);
        data.map((item) => {
          draft.cast = { ...draft.cast, [item.id]: item };
          idShows.push(item.id);
        });
        draft.idCast[draft.showId] = idShows;
        console.log("castloaded", action.payload);
        draft.loading = false;
      });
    case GET_CAST:
      return produce(state, (draft) => {
        draft.showId = action.payload;
        draft.loading = true;
      });

    case GET_SHOWS:
      return produce(state, (draft) => {
        const data = action.payload as apiResult;
        console.log("castdata", data);
        let idShows: number[] = [];
        data.map((item) => {
          const castEntity = new schema.Entity("cast");
          const normalizedData = normalize(item.cast, [castEntity]);
          console.log("normalizedData", normalizedData);
          draft.cast = { ...draft.cast, ...normalizedData.entities.cast };
          draft.idCast[item.show.id] = normalizedData.result;
        });

        draft.loading = false;
      });

    default:
      return state;
  }
}
