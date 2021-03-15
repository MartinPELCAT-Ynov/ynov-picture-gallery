import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { GetTravelQuery } from "src/__generated__";

type TravelContextType = {
  travel: GetTravelQuery["getTravel"] | undefined;
  setTravel: Dispatch<SetStateAction<GetTravelQuery["getTravel"] | undefined>>;
};

export const TravelContext = createContext<TravelContextType>(undefined!);

export const TravelContextProvider: FC = ({ children }) => {
  const [travel, setTravel] = useState<GetTravelQuery["getTravel"]>();

  return (
    <TravelContext.Provider value={{ travel, setTravel }}>
      {children}
    </TravelContext.Provider>
  );
};
