import { KoaContext } from "server/types/koa-types";
import {
  ClassType,
  Ctx,
  FieldResolver,
  Int,
  Resolver,
  Root,
} from "type-graphql";
import { getRepository } from "typeorm";
import { Like } from "../entity/Like";
import { ReactionEntity } from "../entity/ReactionEntitiy";
import { User } from "../entity/User";
import { Comment } from "../entity/Comment";

export function createReactionEntityResolver<T extends ClassType<any>>(
  _suffix: string,
  objectTypeCls: T
) {
  @Resolver(() => objectTypeCls, { isAbstract: true })
  abstract class AbstractReactionEntityResolver {
    @FieldResolver(() => [Comment])
    async comments(@Root() entity: ReactionEntity) {
      return getRepository(Comment).find({ where: { entity: entity.uuid } });
    }

    @FieldResolver(() => Boolean)
    async liked(
      @Root() entity: ReactionEntity,
      @Ctx() { session }: KoaContext
    ) {
      const user = session?.user as User;
      if (!user) return false;
      const likeCount = await getRepository(Like).count({
        where: { entity: entity.uuid, user: user.uuid },
      });
      return likeCount === 1;
    }

    @FieldResolver(() => Int)
    async likes(@Root() entity: any) {
      return getRepository(Like).count({ where: { entity: entity.uuid } });
    }
  }

  return AbstractReactionEntityResolver;
}
