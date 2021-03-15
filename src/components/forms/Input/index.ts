import { DefaultInput as Default } from "./input";
import { TextArea } from "./text-area";

export type InputProps = {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
};

export const Input = { Default, TextArea };
