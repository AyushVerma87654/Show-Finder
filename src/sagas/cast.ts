import { cast } from "./../models/cast";
import { Action } from "./../redux/actions/index";
import { call, put } from "redux-saga/effects";
import { getCast } from "../Api";
import { individualCastLoaded } from "../redux/slices/cast";

export function* callCast(action: Action): Generator {
  const cast = yield call(getCast, action.payload);
  yield put(individualCastLoaded(cast as cast[]));
}
