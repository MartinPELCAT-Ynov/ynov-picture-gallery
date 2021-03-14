import { KoaContext } from "server/types/koa-types";
import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Resolver,
  ForbiddenError,
} from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Album, Travel, User } from "../entity";
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
}
