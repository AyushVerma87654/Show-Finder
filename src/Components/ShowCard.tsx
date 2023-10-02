import { FC } from "react";
import { Link } from "react-router-dom";

type ShowCardProps = {
  image: { medium: string; original: string };
  name: string;
  summary: string;
  id: number;
};

const ShowCard: FC<ShowCardProps> = ({ image, summary, name, id }) => {
  const url =
    "https://images.unsplash.com/photo-1556888335-23631cd2801a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Ymxhbmt8ZW58MHx8MHx8&w=1000&q=80";
  const newImage = image?.medium || image?.original || url;
  return (
    <div className="max-w-xs rounded-md shadow-md p-2 m-1">
      <img
        src={newImage}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">{name}</h2>
          <p>{summary}</p>
        </div>
        <Link
          to={"/show/" + id}
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ShowCard;
