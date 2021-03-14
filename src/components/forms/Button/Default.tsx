import clsx from "clsx";
import React from "react";
import { Spinner } from "src/components/spinner";
import { ButtonProps } from ".";

export const DefaultButton = ({
  type = "submit",
  label,
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={clsx(
        props.className ? props.className : "bg-gray-700 text-white",
        "relative p-2 w-full text-center rounded-md flex items-center justify-center"
      )}
    >
      {loading && (
        <div className="absolute left-4">
          <Spinner />
        </div>
      )}
      <span className="font-semibold">{label}</span>
    </button>
  );
};
