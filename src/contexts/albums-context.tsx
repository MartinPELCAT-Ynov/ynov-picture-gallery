import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { PreviewAlbumFragment } from "src/__generated__";

type AlbumsContextType = {
  addAlbum: (travel: PreviewAlbumFragment) => void;
  removeAlbum: (travelId: string) => void;
  albums: PreviewAlbumFragment[];
  setAlbums: Dispatch<SetStateAction<PreviewAlbumFragment[]>>;
};

export const AlbumsContext = createContext<AlbumsContextType>(undefined!);

export const AlbumsContextProvider: FC = ({ children }) => {
  const [albums, setAlbums] = useState<PreviewAlbumFragment[]>([]);

  const addAlbum = (album: PreviewAlbumFragment) => {
    setAlbums((albs) => [...albs, album]);
  };
  const removeAlbum = (albumId: string) => {
    setAlbums((albs) => [...albs.filter((alb) => alb.uuid !== albumId)]);
  };

  return (
    <AlbumsContext.Provider
      value={{
        addAlbum,
        removeAlbum,
        albums,
        setAlbums,
      }}
    >
      {children}
    </AlbumsContext.Provider>
  );
};
