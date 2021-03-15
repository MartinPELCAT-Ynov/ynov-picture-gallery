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
  Query,
  UnauthorizedError,
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

  @Query(() => Album)
  async album(@Arg("id") uuid: string, @Ctx() { session }: KoaContext) {
    const album = await this.albumRepository.findOne({ where: { uuid } });
    if (!album) throw new Error("Album does not exist");
    const sessionUser = session?.user as User | null;
    const user = await this.getAlbumOwner(album);
    const isPublic = album.isPublic;
    if (!isPublic && sessionUser?.uuid !== user.uuid) {
      throw new UnauthorizedError();
    } else {
      return album;
    }
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

  @FieldResolver(() => Int)
  async photoCount(@Root() album: Album) {
    const curentAlbum = await this.albumRepository
      .createQueryBuilder("album")
      .loadRelationCountAndMap("album.photos", "album.photos")
      .where("album.uuid = :uuid", { uuid: album.uuid })
      .getOne();

    if (!curentAlbum) throw new Error("Cannot find album: " + album.uuid);
    return curentAlbum.photos;
  }

  @FieldResolver(() => User, { nullable: true })
  async owner(@Root() album: Album) {
    const user = await this.getAlbumOwner(album);
    return user;
  }

  private async getAlbumOwner(album: Album): Promise<User> {
    const travel = await this.travelRepository.findOne({
      where: { entity: album.travelId },
      relations: ["user"],
    });
    if (!travel) throw new Error("Faild to fetch user");
    return travel.user;
  }
}
