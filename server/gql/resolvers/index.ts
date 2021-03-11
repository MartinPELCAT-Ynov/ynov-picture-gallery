import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "./user-resolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  UserResolver,
];
