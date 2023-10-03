import show from "../../models/show";
import { ActionCreator } from "./index";

export const GET_INDIVIDUAL_SHOW = "GET_INDIVIDUAL_SHOW";

export const individualShowAction: ActionCreator<show> = (show: show) => ({
  type: GET_INDIVIDUAL_SHOW,
  payload: show,
});

export const LOAD_INDIVIDUAL_SHOW = "LOAD_INDIVIDUAL_SHOW";

export const loadIndividualShowAction: ActionCreator<number> = (
  showId: number
) => ({
  type: LOAD_INDIVIDUAL_SHOW,
  payload: showId,
});
