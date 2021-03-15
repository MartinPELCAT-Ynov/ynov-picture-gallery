import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { InputProps } from ".";

type TextAreaProps = InputProps &
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
export const TextArea = ({
  label,
  name,
  placeholder = label,
  required = false,
  defaultValue,
  ...rest
}: TextAreaProps) => {
  return (
    <div className="flex flex-col flex-1">
      <label htmlFor={name}>
        {label}
        {required && <span className="text-red-600 pl-0.5">*</span>}
      </label>
      <textarea
        {...rest}
        name={name}
        id={name}
        className="bg-gray-100 w-full px-1 py-2 rounded-md"
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
      />
    </div>
  );
};
