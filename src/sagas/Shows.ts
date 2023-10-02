import { apiResult } from "./../models/apiResult";

import { Action } from "./../redux/actions/index";
import { getIndividualShow, getShows } from "./../Api";
import { call, put } from "redux-saga/effects";
import { individualShowloaded, showloaded } from "../redux/slices/show";
import show from "../models/show";

export function* callShow(action: Action): Generator {
  const shows = yield call(getShows, action.payload);
  yield put(showloaded(shows as apiResult));
}

export function* callIndividualShow(action: Action): Generator {
  const show = yield call(getIndividualShow, action.payload);
  yield put(individualShowloaded(show as show));
}
