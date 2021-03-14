import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { PreviewTravelFragment } from "src/__generated__";

type TravelContextType = {
  addTravel: (travel: PreviewTravelFragment) => void;
  removeTravel: (travelId: string) => void;
  travels: PreviewTravelFragment[];
  setTravels: Dispatch<SetStateAction<PreviewTravelFragment[]>>;
};

export const TravelContext = createContext<TravelContextType>(undefined!);

export const TravelContextProvider: FC = ({ children }) => {
  const [travels, setTravels] = useState<PreviewTravelFragment[]>([]);

  const addTravel = (travel: PreviewTravelFragment) => {
    setTravels((trvls) => [...trvls, travel]);
  };
  const removeTravel = (travelId: string) => {
    setTravels((trvls) => [...trvls.filter((trv) => trv.uuid !== travelId)]);
  };

  return (
    <TravelContext.Provider
      value={{ addTravel, removeTravel, travels, setTravels }}
    >
      {children}
    </TravelContext.Provider>
  );
};
