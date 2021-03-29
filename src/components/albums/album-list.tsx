import { useContext } from "react";
import { TravelContext } from "src/contexts/travel-context";
import { PreviewAlbumFragment } from "src/__generated__";
import { AlbumItem } from "./album-item";
import dynamic from "next/dynamic";

const MapDestination = dynamic(() => import("../MapDestination"), {
  ssr: false,
});

export type Props = { albums: PreviewAlbumFragment[] };

export const AlbumList = ({ albums }: Props) => {
  const { travel } = useContext(TravelContext);

  console.log(travel?.destinations);

  return (
    <div className="p-4">
      {travel?.destinations && (
        <MapDestination destinations={travel.destinations} />
      )}
      <div className="flex flex-wrap -m-4">
        {albums.map((albs) => (
          <AlbumItem {...albs} key={albs.uuid} />
        ))}
      </div>
    </div>
  );
};
