import { StorageService } from "../../services/storage/storage-service";
import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { getConnection, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Photo } from "../entity/Photo";
import { SucessObject } from "../inputs/sucess-object";
import { createReactionEntityResolver } from "./abstract-reaction-entity-resolver";

const PhotoEntityResolver = createReactionEntityResolver("photo", Photo);

@Service()
@Resolver(() => Photo)
export class PhotoResolver extends PhotoEntityResolver {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly storageService: StorageService
  ) {
    super();
  }
  @Mutation(() => SucessObject)
  @Authorized()
  async deletePhotos(
    @Arg("photoIds", () => [String]) photoIds: string[]
  ): Promise<SucessObject> {
    const photos = await this.photoRepository
      .createQueryBuilder("photo")
      .leftJoinAndSelect("photo.entity", "relationentity")
      .where("relationentity.uuid IN (:...photoIds)", { photoIds })
      .getMany();

    await getConnection().transaction(async (manager) => {
      const deletePhotos = photos.map(async (photo) => {
        return manager.remove(await photo.entity);
      });

      await Promise.all(deletePhotos);
      await this.storageService.deletePhotos(photos);
    });

    return { success: true };
  }
}
