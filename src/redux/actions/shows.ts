import { ActionCreator } from "./index";
import show from "../../models/show";

export const GET_SHOWS = "GET_SHOWS";

export const showsAction: ActionCreator<show[]> = (show) => ({
  type: GET_SHOWS,
  payload: show,
});

export const QUERY_UPDATE = "QUERY_UPDATE";

export const queryAction: ActionCreator<string> = (query) => ({
  type: QUERY_UPDATE,
  payload: query,
});
