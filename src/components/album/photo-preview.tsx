import React from "react";
import { Photo } from "src/__generated__";

export const PhotoPreview = ({ url }: Photo) => {
  return (
    <div className="w-1/5 h-52 overflow-hidden">
      <img
        src={url}
        className="object-cover w-full h-52 hover:scale-110 transform duration-300"
      />
    </div>
  );
};
