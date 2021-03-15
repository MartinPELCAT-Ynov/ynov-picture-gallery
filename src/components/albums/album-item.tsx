import Link from "next/link";
import { PreviewAlbumFragment } from "src/__generated__";
import { LockCloseIcon } from "../icons/LockCloseIcon";

export const AlbumItem = ({
  name,
  uuid,
  photoCount,
  isPublic,
}: PreviewAlbumFragment) => {
  return (
    <div className="my-3 w-1/4">
      <div className="mx-4 my-1 bg-white p-4 rounded-lg shadow h-full">
        <Link href={`/album/${uuid}`}>
          <a>
            <div className="flex flex-col justify-between h-full space-y-2">
              <span className="uppercase line-clamp-1" title={name}>
                {name}
              </span>
              <div className="flex justify-between">
                <div>{!isPublic ? <LockCloseIcon /> : <></>}</div>
                <span className="text-xs self-end">
                  {photoCount} {photoCount > 1 ? "Photos" : "Photo"}
                </span>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};
