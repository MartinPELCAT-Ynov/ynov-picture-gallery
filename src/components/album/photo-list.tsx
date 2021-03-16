import { Photo } from "src/__generated__";
import { PhotoPreview } from "./photo-preview";

type Props = { photos: Photo[] };

export const PhotoList = ({ photos }: Props) => {
  return (
    <div className="flex flex-wrap">
      {photos.map((photo) => (
        <PhotoPreview {...photo} key={photo.uuid} />
      ))}
    </div>
  );
};
