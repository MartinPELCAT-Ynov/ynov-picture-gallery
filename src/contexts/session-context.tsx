import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { MeQuery, useMeQuery } from "src/__generated__";

export type SessionUser = MeQuery["me"];

export type ISessionContext = {
  user: SessionUser | undefined;
  setUser: Dispatch<SetStateAction<SessionUser | undefined>>;
  loading: boolean;
};

export const SessionContext = createContext<ISessionContext>(undefined!);

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
