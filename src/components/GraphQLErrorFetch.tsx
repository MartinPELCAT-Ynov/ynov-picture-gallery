import { ApolloError } from "@apollo/client";
import React from "react";

export const GraphQLErrorFetch = ({ message }: ApolloError) => {
  return (
    <div className="w-2/3 mx-auto p-4 text-xl ">
      <div className="bg-red-200 text-red-600 shadow-md border-red-300 border-2 rounded-md p-4">
        {message}
      </div>
    </div>
  );
};
