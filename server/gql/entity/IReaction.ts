import { Like, Comment } from ".";

export interface IReaction {
  likes: Like[];
  comments: Comment[];
}
