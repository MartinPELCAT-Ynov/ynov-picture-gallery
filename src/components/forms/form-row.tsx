import { FC } from "react";

export const FormRow: FC = ({ children }) => {
  return <div className="pt-2 pb-1 flex space-x-6">{children}</div>;
};
