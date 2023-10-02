import React, { FC } from "react";
import { cast } from "../models/cast";

type CastImageProps = {
  cast: cast[];
  className: string;
};

const CastImage: FC<CastImageProps> = ({ cast, className }) => {
  return (
    <div
      className={
        "w-32 md:w-52 p-1 bg-white border border-gray-700 rounded-md space-x-10 " +
        className
      }
    ></div>
  );
};

export default CastImage;
