import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { PreviewTravelFragment } from "src/__generated__";

type TravelsContextType = {
  addTravel: (travel: PreviewTravelFragment) => void;
  removeTravel: (travelId: string) => void;
  travels: PreviewTravelFragment[];
  setTravels: Dispatch<SetStateAction<PreviewTravelFragment[]>>;
};

export const TravelsContext = createContext<TravelsContextType>(undefined!);

export const TravelsContextProvider: FC = ({ children }) => {
  const [travels, setTravels] = useState<PreviewTravelFragment[]>([]);

  const addTravel = (travel: PreviewTravelFragment) => {
    setTravels((trvls) => [...trvls, travel]);
  };
  const removeTravel = (travelId: string) => {
    setTravels((trvls) => [...trvls.filter((trv) => trv.uuid !== travelId)]);
  };

  return (
    <TravelsContext.Provider
      value={{ addTravel, removeTravel, travels, setTravels }}
    >
      {children}
    </TravelsContext.Provider>
  );
};
