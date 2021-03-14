import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GraphQLErrorFetch } from "../GraphQLErrorFetch";
import { ListSkeleton } from "../skeletons/list-skelton";
import { useGetAlbumQuery } from "src/__generated__";
import { AlbumContext } from "src/contexts/album-context";
import { PhotoList } from "./photo-list";

export const AlbumView = () => {
  const { query } = useRouter();
  const { data, loading, error, refetch } = useGetAlbumQuery({
    variables: { id: query.id as string },
  });

  const { album, setAlbum } = useContext(AlbumContext);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setAlbum(data?.album!);
  }, [data]);

  if (loading) return <ListSkeleton />;
  if (error) return <GraphQLErrorFetch {...error} />;

  return <PhotoList photos={album?.photos || []} />;
};
