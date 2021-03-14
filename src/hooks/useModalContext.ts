import { useContext } from "react";
import { ModalContext } from "src/contexts/modal-context";

export const useModalContext = () => {
  const { hide } = useContext(ModalContext);
  return { hide };
};
