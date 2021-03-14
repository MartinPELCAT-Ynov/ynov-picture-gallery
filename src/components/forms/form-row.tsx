import clsx from "clsx";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export const FormRow: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={clsx(props.className, "pt-2 pb-1 flex space-x-6")}
    >
      {children}
    </div>
  );
};
