import React from "react";
import { ItemSkeleton } from "./items-skeleton";

export const ListSkeleton = () => {
  return (
    <div className="p-4">
      <div className="flex flex-wrap -m-4">
        {Array(15)
          .fill(null)
          .map((_, i) => (
            <ItemSkeleton key={i} />
          ))}
      </div>
    </div>
  );
};
