import createSagaMiddleware from "@redux-saga/core";
import { debounce, takeEvery, takeLatest } from "redux-saga/effects";
import { callIndividualShow, callShow } from "../sagas/Shows";
import { callCast } from "../sagas/cast";
import { configureStore } from "@reduxjs/toolkit";
import showReducer, { loadIndividualShow, showQuery } from "./slices/show";
import castReducer, { loadCast } from "./slices/cast";

function* rootsaga() {
  yield debounce(200, showQuery, callShow);
  yield takeEvery(loadIndividualShow, callIndividualShow);
  yield takeLatest(loadCast, callCast);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    shows: showReducer,
    cast: castReducer,
  },
  middleware: [sagaMiddleware],
});
export type State = ReturnType<typeof store.getState>;
sagaMiddleware.run(rootsaga);

export default store;
