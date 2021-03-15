import React from "react";

export const ItemSkeleton = () => {
  return (
    <div className="my-3 w-1/5">
      <div className="mx-4 my-1 bg-white p-4 rounded-lg shadow h-full">
        <div className="flex flex-col justify-between h-full animate-pulse space-y-2">
          <span className="uppercase bg-gray-200 h-6"></span>
          <div className="space-y-1">
            <div className="line-clamp-3 bg-gray-200 h-3"></div>
            <div className="line-clamp-3 bg-gray-200 h-3 w-10/12"></div>
          </div>
          <span className="text-xs self-end bg-gray-200 h-4 w-1/2"></span>
        </div>
      </div>
    </div>
  );
};
