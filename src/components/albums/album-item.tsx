import Link from "next/link";
import { PreviewAlbumFragment } from "src/__generated__";

export const AlbumItem = ({ name, uuid }: PreviewAlbumFragment) => {
  return (
    <div className="my-3 w-1/5">
      <div className="mx-4 my-1 bg-white p-4 rounded-lg shadow h-full">
        <Link href={`/album/${uuid}`}>
          <a>
            <div className="flex flex-col justify-between h-full space-y-2">
              <span className="uppercase">{name}</span>
              {/* <p className="line-clamp-3 text-sm">{description}</p>
              <span className="text-xs self-end">
                {albumsCount} {albumsCount > 1 ? "Albums" : "Album"}
              </span> */}
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};
