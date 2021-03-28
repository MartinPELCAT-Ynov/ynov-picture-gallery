import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DestinationFragment } from "../__generated__";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { decode } from "ngeohash";

type Props = { destinations: DestinationFragment[] };

const MapDestination = ({ destinations }: Props) => {
  const bounds: any = destinations.map((dest) => {
    const position = decode(dest.geohash);
    return [position.latitude, position.longitude];
  });

  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden my-3 z-0">
      <MapContainer
        bounds={bounds}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution="Ynov pictures"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {destinations.map((dest) => {
          const position = decode(dest.geohash);
          return (
            <Marker
              key={dest.uuid}
              position={[position.latitude, position.longitude]}
            >
              <Popup>
                <a href={`/destination/${dest.uuid}`}>{dest.name}</a>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapDestination;
