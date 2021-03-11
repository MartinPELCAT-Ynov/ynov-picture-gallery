import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { MeQuery, useMeQuery } from "src/__generated__";

type User = MeQuery["me"] | undefined;

type ContextValues = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  loading: boolean;
};

export const SessionContext = createContext<ContextValues>(undefined!);

export const SessionContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<MeQuery["me"] | undefined>(undefined);
  const { data, loading } = useMeQuery();

  useEffect(() => {
    setUser(data?.me);
  }, [data]);

  return (
    <SessionContext.Provider value={{ setUser, user, loading }}>
      {children}
    </SessionContext.Provider>
  );
};
