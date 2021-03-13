import React from "react";
import { PlusIcon } from "src/components/icons/PlusIcon";
import { ButtonProps } from ".";

export const Create = ({
  type = "button",
  label,
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <div className="relative">
      <button
        {...props}
        type={type}
        className="relative border-2 text-indigo-500 border-indigo-500 pl-3 pr-6 py-2 rounded-md font-semibold flex space-x-2 items-center focus:outline-none"
      >
        <PlusIcon /> <span>{label}</span>
      </button>
      <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
      </span>
    </div>
  );
};
