import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { GetAlbumQuery } from "src/__generated__";

type AlbumContextType = {
  album: GetAlbumQuery["album"] | null;
  setAlbum: Dispatch<SetStateAction<GetAlbumQuery["album"] | null>>;
};

export const AlbumContext = createContext<AlbumContextType>(undefined!);

export const AlbumContextProvider: FC = ({ children }) => {
  const [album, setAlbum] = useState<GetAlbumQuery["album"] | null>(null);

  return (
    <AlbumContext.Provider
      value={{
        album,
        setAlbum,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};
