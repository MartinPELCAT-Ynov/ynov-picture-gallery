import { KoaContext } from "server/types/koa-types";
import { User } from "src/__generated__";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { getRepository, getConnection } from "typeorm";
import { Comment } from "../entity/Comment";
import { Like } from "../entity/Like";
import { ReactionEntity } from "../entity/ReactionEntitiy";
import { SucessObject } from "../inputs/sucess-object";

@Service()
@Resolver()
export class ReactionEntityResolver {
  @Mutation(() => Comment)
  @Authorized()
  async addComment(
    @Arg("content") content: string,
    @Arg("albumId") entityId: string,
    @Ctx() { session }: KoaContext
  ) {
    const user = session!.user as User;
    const commentRepo = getRepository(Comment);

    const newComment = commentRepo.create({
      content,
      user: user.uuid as any,
      entity: entityId as any,
    });

    const comment = commentRepo.save(newComment);
    await getConnection()
      .createQueryBuilder()
      .relation(ReactionEntity, "comments")
      .of(entityId)
      .add(comment);

    return comment;
  }

  @Mutation(() => SucessObject)
  @Authorized()
  async removeComment(
    @Arg("commentUuid") commentUuid: string,
    @Ctx() { session }: KoaContext
  ): Promise<SucessObject> {
    const sessionUser = session!.user as User;
    const commentRepo = getRepository(Comment);

    await commentRepo
      .createQueryBuilder("comment")
      .delete()
      .from(Comment)
      .where("comment.user = :userUuid", { userUuid: sessionUser.uuid })
      .where("uuid = :uuid", { uuid: commentUuid })
      .execute();

    return { success: true };
  }

  @Mutation(() => SucessObject)
  @Authorized()
  async toogleLike(
    @Arg("entityUuid") entityUuid: string,
    @Ctx() { session }: KoaContext
  ): Promise<SucessObject> {
    const user = session!.user as User;

    const likeRepo = getRepository(Like);

    const likeCount = await likeRepo.count({
      where: { entity: entityUuid, user: user.uuid },
    });

    const likeExist = likeCount === 1;

    if (likeExist) {
      await likeRepo
        .createQueryBuilder("like")
        .delete()
        .where("like.entity = :entityUuid", { entityUuid })
        .andWhere("like.user = :userUuid", { userUuid: user.uuid })
        .execute();

      return { success: true };
    } else {
      const newLike = likeRepo.create({
        entity: entityUuid as any,
        user: user.uuid as any,
      });

      await likeRepo.save(newLike);

      return { success: true };
    }
  }
}
