import { DefaultButton as Default } from "./Default";
import { Create } from "./Create";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  label: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  loading?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = { Default, Create };
