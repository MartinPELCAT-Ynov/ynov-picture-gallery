import { KoaContext } from "server/types/koa-types";
import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Resolver,
  ForbiddenError,
  FieldResolver,
  Int,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Album, Photo, Travel, User } from "../entity";
import { CreateAlbumInput } from "../inputs/album-input";

@Service()
@Resolver(() => Album)
export class AlbumResolver {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>
  ) {}

  @Mutation(() => Album)
  @Authorized()
  async createAlbum(
    @Arg("input") { name, travelId }: CreateAlbumInput,
    @Ctx() { session }: KoaContext
  ) {
    const travel = await this.travelRepository.findOne(travelId);
    const userSession = session!.user as User;
    if (travel?.userId !== userSession.uuid) throw new ForbiddenError();
    const album = this.albumRepository.create({ name, travel });
    return this.albumRepository.save(album);
  }

  @FieldResolver(() => Int)
  async photoCount() {
    return 90;
  }

  @FieldResolver(() => [Photo])
  async photos(@Root() album: Album): Promise<Photo[]> {
    const curentAlbum = await this.albumRepository.findOne({
      where: { uuid: album.uuid },
      relations: ["photos"],
    });
    if (!curentAlbum) throw new Error("Cannot find album: " + album.uuid);
    return curentAlbum.photos;
  }
}
