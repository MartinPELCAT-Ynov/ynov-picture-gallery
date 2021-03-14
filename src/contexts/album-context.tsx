import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { PreviewAlbumFragment } from "src/__generated__";

type AlbumContextType = {
  addAlbum: (travel: PreviewAlbumFragment) => void;
  removeAlbum: (travelId: string) => void;
  albums: PreviewAlbumFragment[];
  setAlbums: Dispatch<SetStateAction<PreviewAlbumFragment[]>>;
};

export const AlbumContext = createContext<AlbumContextType>(undefined!);

export const AlbumContextProvider: FC = ({ children }) => {
  const [albums, setAlbums] = useState<PreviewAlbumFragment[]>([]);

  const addAlbum = (album: PreviewAlbumFragment) => {
    setAlbums((albs) => [...albs, album]);
  };
  const removeAlbum = (albumId: string) => {
    setAlbums((albs) => [...albs.filter((alb) => alb.uuid !== albumId)]);
  };

  return (
    <AlbumContext.Provider
      value={{
        addAlbum,
        removeAlbum,
        albums,
        setAlbums,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};
