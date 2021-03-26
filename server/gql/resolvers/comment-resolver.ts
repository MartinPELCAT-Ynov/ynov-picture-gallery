import { FieldResolver, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";

@Service()
@Resolver(() => Comment)
export class CommentResolver {
  @FieldResolver(() => User, { nullable: true })
  async user(@Root() comment: Comment) {
    const currentComment = await getRepository(Comment).findOneOrFail({
      where: { uuid: comment.uuid },
      relations: ["user"],
    });
    return currentComment.user;
  }
}
