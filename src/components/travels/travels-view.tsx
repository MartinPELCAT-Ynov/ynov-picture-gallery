import { useContext, useEffect } from "react";
import { TravelsContext } from "src/contexts/travels-context";
import { useMyTravelsQuery } from "src/__generated__";
import { GraphQLErrorFetch } from "../GraphQLErrorFetch";
import { ListSkeleton } from "../skeletons/list-skelton";
import { TravelList } from "./travel-list";

export const TravelsView = () => {
  const { data, loading, error, refetch } = useMyTravelsQuery();

  const { travels, setTravels } = useContext(TravelsContext);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setTravels(data?.myTravels || []);
  }, [data]);

  if (loading) return <ListSkeleton />;
  if (error) return <GraphQLErrorFetch {...error} />;

  return <TravelList travels={travels} />;
};
