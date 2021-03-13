import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "./auth-resolver";
import { TravelResolver } from "./travel-resolver";
import { UserResolver } from "./user-resolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  UserResolver,
  AuthResolver,
  TravelResolver,
];
