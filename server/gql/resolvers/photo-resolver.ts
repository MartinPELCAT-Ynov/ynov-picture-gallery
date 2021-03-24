import { StorageService } from "../../services/storage/storage-service";
import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { getConnection, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Photo } from "../entity/Photo";
import { SucessObject } from "../inputs/sucess-object";

@Service()
@Resolver(() => Photo)
export class PhotoResolver {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly storageService: StorageService
  ) {}
  @Mutation(() => SucessObject)
  @Authorized()
  async deletePhotos(
    @Arg("photoIds", () => [String]) photoIds: string[]
  ): Promise<SucessObject> {
    const photos = await this.photoRepository
      .createQueryBuilder("photo")
      .leftJoin("photo.entity", "relationentity")
      .where("relationentity.uuid IN (:...photoIds)", { photoIds })
      .getMany();

    console.log(photos);
    return { success: true };

    await getConnection().transaction(async (manager) => {
      await manager.remove(photos);
      await this.storageService.deletePhotos(photos);
    });

    return { success: true };
  }
}
