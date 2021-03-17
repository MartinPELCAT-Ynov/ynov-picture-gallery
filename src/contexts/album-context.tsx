import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { GetAlbumQuery, Photo } from "src/__generated__";

type AlbumContextType = {
  album: GetAlbumQuery["album"] | null;
  setAlbum: Dispatch<SetStateAction<GetAlbumQuery["album"] | null>>;
  deletePhoto(photo: Photo): void;
};

export const AlbumContext = createContext<AlbumContextType>(undefined!);

export const AlbumContextProvider: FC = ({ children }) => {
  const [album, setAlbum] = useState<GetAlbumQuery["album"] | null>(null);

  const deletePhoto = async (photo: Photo) => {
    setAlbum((prev) => {
      return {
        ...prev!,
        photos: prev!.photos.filter((ph) => ph.uuid !== photo.uuid),
        photoCount: prev!.photoCount - 1,
      };
    });
  };

  return (
    <AlbumContext.Provider
      value={{
        album,
        setAlbum,
        deletePhoto,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};
