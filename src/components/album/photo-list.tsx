import { Photo } from "src/__generated__";
import { PhotoPreview } from "./photo-preview";

export type PhotoProp = Pick<Photo, "url" | "uuid" | "name">;

type Props = { photos: PhotoProp[] };

export const PhotoList = ({ photos }: Props) => {
  return (
    <div className="flex flex-wrap">
      {photos.map((photo) => (
        <PhotoPreview {...photo} key={photo.uuid} />
      ))}
    </div>
  );
};
