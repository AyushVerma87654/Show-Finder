import { cast } from "../../models/cast";
import { ActionCreator } from "./index";

export const GET_CAST = "GET_CAST";

export const castAction: ActionCreator<number> = (showId) => ({
  type: GET_CAST,
  payload: showId,
});

export const CAST_LOADED = "CAST_LOADED";

export const castLoadedAction: ActionCreator<cast[]> = (cast: cast[]) => ({
  type: CAST_LOADED,
  payload: cast,
});
