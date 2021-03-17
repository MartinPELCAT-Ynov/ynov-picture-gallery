import { GraphQLUpload } from "apollo-server-koa";
import { StorageService } from "../../services/storage/storage-service";
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
import { FileType } from "../scalars/file-scalar";

@Service()
@Resolver(() => Album)
export class AlbumResolver {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
    private readonly storageService: StorageService
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
    const user = await album.getOwner();
    const isPublic = album.isPublic;
    if (!isPublic && sessionUser?.uuid !== user.uuid) {
      throw new UnauthorizedError();
    } else {
      return album;
    }
  }

  @Mutation(() => Album)
  async addPhotosToAlbum(
    @Arg("albumUuid") albumUuid: string,
    @Arg("files", () => [GraphQLUpload]) upFiles: Promise<FileType>[],
    @Ctx() { session }: KoaContext
  ) {
    const files = await Promise.all(upFiles);
    const album = await this.albumRepository.findOne(albumUuid);
    if (!album) throw new Error("Album not found");
    if ((await album.getOwner()).uuid !== session?.user.uuid) {
      throw new UnauthorizedError();
    }
    const photos = await this.storageService.uploadPhotos(files);
    album.photos = [...(album.photos || []), ...photos];
    return await this.albumRepository.save(album);
  }

  @FieldResolver(() => [Photo])
  async photos(@Root() album: Album): Promise<Photo[]> {
    const curentAlbum = await this.albumRepository.findOne({
      where: { uuid: album.uuid },
      relations: ["photos"],
    });
    if (!curentAlbum) throw new Error("Cannot find album: " + album.uuid);

    return this.storageService.getPhotos(curentAlbum.photos);
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

  @FieldResolver(() => User)
  async owner(@Root() album: Album) {
    return album.getOwner();
  }
}
