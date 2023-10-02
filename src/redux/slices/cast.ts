import { cast } from "./../../models/cast";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { castObject } from "../../models/castObject";
import { apiResult } from "../../models/apiResult";
import { normalize, schema } from "normalizr";

type State = {
  cast: castObject;
  showId: number;
  idCast: { [a: number]: number[] };
  loading: boolean;
};

const initialState: State = {
  cast: {},
  showId: 0,
  idCast: {},
  loading: false,
};

export const castSlice = createSlice({
  name: "cast",
  initialState,
  reducers: {
    castAction,
    individualCastLoadedAction,
    showsAction,
  },
});

function showsAction(state: State, action: PayloadAction<apiResult>) {
  const data = action.payload as apiResult;
  console.log("castdata", data);
  let idShows: number[] = [];
  data.map((item) => {
    const castEntity = new schema.Entity("cast");
    const normalizedData = normalize(item.cast, [castEntity]);
    // console.log("normalizedData", normalizedData);
    state.cast = { ...state.cast, ...normalizedData.entities.cast };
    state.idCast[item.show.id] = normalizedData.result;
  });

  state.loading = false;
}

function castAction(state: State, action: PayloadAction<number>) {
  state.showId = action.payload;
  state.loading = true;
}
function individualCastLoadedAction(
  state: State,
  action: PayloadAction<cast[]>
) {
  const data = action.payload as cast[];
  let idShows: number[] = [];
  //   console.log(data);
  data.map((item) => {
    state.cast = { ...state.cast, [item.id]: item };
    idShows.push(item.id);
  });
  state.idCast[state.showId] = idShows;
  //   console.log("castloaded", action.payload);
  state.loading = false;
}

const { actions, reducer: castReducer } = castSlice;

export const {
  castAction: loadCast,
  showsAction: castLoaded,
  individualCastLoadedAction: individualCastLoaded,
} = actions;

export default castReducer;
