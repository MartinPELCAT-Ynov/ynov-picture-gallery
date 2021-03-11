import { compare, hash } from "bcrypt";

export const hashPassword = (plainPassword: string) => {
  return hash(plainPassword, 2);
};

export const isValidPassword = (
  plainPassword: string,
  encryptedPassword: string
) => {
  return compare(plainPassword, encryptedPassword);
};
