import { FC, useEffect } from "react";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { State } from "../redux/store";
import { loadingSelector, showSelector } from "../redux/selectors/show";
import show from "../models/show";
import { getIndividualShow } from "../Api";
import { connect, ConnectedProps } from "react-redux";
import LoadingSpinner from "../Components/LoadingSpinner";
import {
  castLoadingSelector,
  castSelector,
  idCastSelector,
} from "../redux/selectors/cast";
import { cast } from "../models/cast";
import { loadIndividualShow } from "../redux/slices/show";
import { loadCast } from "../redux/slices/cast";

type ownProps = ReduxProps;

type ShowDetailPageProps = ownProps & WithRouterProps;

const ShowDetailPage: FC<ShowDetailPageProps> = ({
  params,
  cast,
  show,
  getShow,
  castSearch,
  castLoading,
  showLoading,
}) => {
  useEffect(() => {
    castSearch(+params.showId);
    getShow(+params.showId);
  }, [params.showId]);
  const url =
    "https://images.unsplash.com/photo-1556888335-23631cd2801a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Ymxhbmt8ZW58MHx8MHx8&w=1000&q=80";

  if (!show || !cast) {
    return <LoadingSpinner />;
  }
  const newImage = show.image?.medium || show.image?.original || url;

  console.log("show", show);

  return (
    <div className="mt-2">
      <h2 className="text-4xl font-semibold tracking-wide">{show.name}</h2>
      <span>{showLoading && <LoadingSpinner />}</span>
      <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        {show.genres.map((item) => (
          <GenrePill name={item} key={item} />
        ))}
      </div>
      <div className="mt-2 flex">
        <img
          src={newImage}
          alt=""
          className="object-cover object-center w-full rounded-t-md h-72"
        />
        <div className="ml-2">
          <p>{show.summary}</p>
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating:
            <span className="text-gray-700">{show.rating.average}/10</span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <span>{castLoading && <LoadingSpinner />}</span>
        <div className="flex flex-wrap">
          {cast.map((item: any) => (
            <CastCard
              key={item.id}
              avatarLink={item.image?.medium || show.image?.original || url}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: WithRouterProps) => {
  const castArray = idCastSelector(state)[+ownProps.params.showId];
  const cast = castArray?.map((item: any) => castSelector(state)[item]);
  return {
    show: showSelector(state)[+ownProps.params.showId],
    cast: cast,
    showLoading: loadingSelector(state),
    castLoading: castLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  getShow: loadIndividualShow,
  castSearch: loadCast,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ShowDetailPage));
