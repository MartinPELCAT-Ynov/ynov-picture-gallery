import { NonEmptyArray } from "type-graphql";
import { AlbumResolver } from "./album-resolver";
import { AuthResolver } from "./auth-resolver";
import { CommentResolver } from "./comment-resolver";
import { DestinationResolver } from "./destination-resolver";
import { PhotoResolver } from "./photo-resolver";
import { ReactionEntityResolver } from "./reaction-entity-resolver";
import { TravelResolver } from "./travel-resolver";
import { UserResolver } from "./user-resolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  UserResolver,
  AuthResolver,
  TravelResolver,
  AlbumResolver,
  PhotoResolver,
  DestinationResolver,
  ReactionEntityResolver,
  CommentResolver,
];
