import { PreviewAlbumFragment } from "src/__generated__";
import { AlbumItem } from "./album-item";

export type Props = { albums: PreviewAlbumFragment[] };

export const AlbumList = ({ albums }: Props) => {
  return (
    <div className="p-4">
      <div className="flex flex-wrap -m-4">
        {albums.map((albs) => (
          <AlbumItem {...albs} key={albs.uuid} />
        ))}
      </div>
    </div>
  );
};
