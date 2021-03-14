import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AlbumsContext } from "src/contexts/albums-context";
import { TravelContext } from "src/contexts/travel-context";
import { useGetTravelQuery } from "src/__generated__";
import { GraphQLErrorFetch } from "../GraphQLErrorFetch";
import { ListSkeleton } from "../skeletons/list-skelton";
import { AlbumList } from "./album-list";

export const AlbumsView = () => {
  const { query } = useRouter();
  const { data, loading, error, refetch } = useGetTravelQuery({
    variables: { id: query.id as string },
  });

  const { setTravel } = useContext(TravelContext);
  const { albums, setAlbums } = useContext(AlbumsContext);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setTravel(data?.getTravel);
    setAlbums(data?.getTravel.albums || []);
  }, [data]);

  if (loading) return <ListSkeleton />;
  if (error) return <GraphQLErrorFetch {...error} />;

  return <AlbumList albums={albums} />;
};
