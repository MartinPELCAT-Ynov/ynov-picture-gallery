import React from "react";
import { Photo } from "src/__generated__";

export const PhotoPreview = ({ url, uuid }: Photo) => {
  return (
    <div>
      <img src={url} alt="" />
      {uuid}
    </div>
  );
};
