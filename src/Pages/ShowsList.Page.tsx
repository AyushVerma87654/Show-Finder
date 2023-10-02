import { FC } from "react";
import { connect, ConnectedProps, useSelector } from "react-redux";
import LoadingSpinner from "../Components/LoadingSpinner";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import {
  querySelector,
  showMapSelector,
  loadingSelector,
} from "../redux/selectors/show";
import { showQuery } from "../redux/slices/show";
import { State } from "../redux/store";

type ownProps = ReduxProps;

type ShowListPageProps = ownProps;

const ShowListPage: FC<ShowListPageProps> = ({
  query,
  shows,
  querySearch,
  loading,
}) => {
  return (
    <div className="mt-2">
      <div className="flex item-center">
        <SearchBar onChange={(event) => querySearch(event.target.value)} />
        {loading && <LoadingSpinner className="mx-auto" />}
      </div>
      <div className="flex flex-wrap">
        {shows &&
          shows.map((item) => (
            <ShowCard
              key={item.id}
              image={item.image}
              summary={item.summary}
              name={item.name}
              id={item.id}
            />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  query: querySelector(state),
  shows: showMapSelector(state),
  loading: loadingSelector(state),
});

const mapDispatchToProps = {
  querySearch: showQuery,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);
