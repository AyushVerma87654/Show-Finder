import axios from "axios";
import { cast } from "./models/cast";
import show from "./models/show";

export const getShows = async (search: string) => {
  const response = await axios.get<{ show: show }[]>(
    "https://api.tvmaze.com/search/shows?q=" + search
  );
  const shows = response.data.map((item) => item.show);
  let castPromises = [];
  for (let i = 0; i < shows.length; i++) {
    const promise = await startingCast(shows[i]);
    castPromises.push(promise);
  }
  const cast = await Promise.all(castPromises);
  return cast;
};

export const getIndividualShow = async (showId: number) => {
  console.log("showId", showId);
  const response = await axios.get<{ show: show }>(
    "https://api.tvmaze.com/shows/" + showId
  );
  return response.data;
};
export const startingCast = async (show: show) => {
  const response = await axios.get<{ person: { cast: cast } }[]>(
    "https://api.tvmaze.com/shows/" + show.id + "/cast"
  );
  const cast = response.data.map((item) => item.person);
  return { cast, show };
};
export const getCast = async (showId: number) => {
  const response = await axios.get<{ person: { cast: cast } }[]>(
    "https://api.tvmaze.com/shows/" + showId + "/cast"
  );
  const cast = response.data.map((item) => item.person);
  return cast;
};
