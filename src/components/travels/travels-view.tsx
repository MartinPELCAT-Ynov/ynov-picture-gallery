import { useContext, useEffect } from "react";
import { TravelContext } from "src/contexts/travels-context";
import { useMyTravelsQuery } from "src/__generated__";
import { GraphQLErrorFetch } from "../GraphQLErrorFetch";
import { ListSkeleton } from "./list-skelton";
import { TravelList } from "./travel-list";

export const TravelsView = () => {
  const { data, loading, error, refetch } = useMyTravelsQuery();

  const { travels, setTravels } = useContext(TravelContext);

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
