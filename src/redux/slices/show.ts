import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiResult } from "../../models/apiResult";
import show from "../../models/show";

type State = {
  show: { [s: number]: show };
  query: string;
  queryShows: { [a: string]: number[] };
  loading: boolean;
  showId: number;
};

const initialState: State = {
  show: {},
  query: "",
  queryShows: {},
  loading: false,
  showId: 0,
};

export const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    showsAction,
    queryAction,
    individualShowAction,
    loadIndividualShowAction,
  },
});

function showsAction(state: State, action: PayloadAction<apiResult>) {
  const data = action.payload as apiResult;
  console.log("data", data);
  state.loading = false;
  let queryShows: number[] = [];
  data.map((item) => {
    state.show = { ...state.show, [item.show.id]: item.show };
    queryShows.push(item.show.id);
  });
  state.queryShows[state.query] = queryShows;
}
function queryAction(state: State, action: PayloadAction<string>) {
  state.query = action.payload;
  state.loading = true;
}
function individualShowAction(state: State, action: PayloadAction<show>) {
  const data = action.payload as show;
  state.show = { ...state.show, [data.id]: data };
  state.loading = false;
}
function loadIndividualShowAction(state: State, action: PayloadAction<number>) {
  state.showId = action.payload;
  state.loading = true;
}

const { actions, reducer: showReducer } = showSlice;

export const {
  showsAction: showloaded,
  queryAction: showQuery,
  individualShowAction: individualShowloaded,
  loadIndividualShowAction: loadIndividualShow,
} = actions;

export default showReducer;
