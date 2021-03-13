import { useMyTravelsQuery } from "src/__generated__";
import { GraphQLErrorFetch } from "../GraphQLErrorFetch";
import { ListSkeleton } from "./list-skelton";

export const FetchTravels = () => {
  const { data, loading, error } = useMyTravelsQuery();

  if (loading) return <ListSkeleton />;
  if (error) return <GraphQLErrorFetch {...error} />;

  return <div>{JSON.stringify(data?.myTravels)}</div>;
};
