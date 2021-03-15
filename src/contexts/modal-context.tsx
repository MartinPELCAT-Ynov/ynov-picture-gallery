import { createContext } from "react";

type ModalContextType = { show: () => void; hide: () => void };

export const ModalContext = createContext<ModalContextType>(undefined!);
