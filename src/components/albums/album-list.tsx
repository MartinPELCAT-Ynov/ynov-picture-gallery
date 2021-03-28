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

  return (
    <div className="p-4">
      {travel?.destinations && (
        <MapDestination destinations={travel.destinations} />
      )}
      <div className="flex flex-wrap -m-4">
        {travel?.destinations.map((destination) => (
          <div key={destination.uuid} className="my-3 w-1/4">
            <div className="mx-4 my-1 bg-white p-4 rounded-lg shadow h-full">
              <span className="text-sm">Dest - {destination.name}</span>
              <div className="text-xs italic text-gray-500">
                {new Date(destination.arrivalDate).toLocaleDateString()} -{" "}
                {new Date(destination.departureDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}

        {albums.map((albs) => (
          <AlbumItem {...albs} key={albs.uuid} />
        ))}
      </div>
    </div>
  );
};
