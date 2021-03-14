import { KoaContext } from "server/types/koa-types";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { AbstractEntity, Album, Travel, User } from "../entity";
import { CreateTravelInput } from "../inputs/travel-input";

@Resolver(() => Travel)
@Service()
export class TravelResolver {
  constructor(
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>
  ) {}

  @Query(() => [Travel])
  @Authorized()
  async myTravels(@Ctx() { session }: KoaContext) {
    const sessionUser = session!.user as User;
    return this.travelRepository.find({ where: { user: sessionUser.uuid } });
  }

  @Mutation(() => Travel, { nullable: true })
  @Authorized()
  async createTravel(
    @Arg("input") { name, description }: CreateTravelInput,
    @Ctx() { session }: KoaContext
  ) {
    const user: User = session!.user;
    const travel = this.travelRepository.create({
      name,
      description,
      user: user,
      entity: AbstractEntity.create(),
    });
    return await this.travelRepository.save(travel);
  }

  @FieldResolver(() => Int)
  async likeCounts(@Root() root: Travel) {
    console.log(">>", root.entityId);
    return 9;
  }

  @FieldResolver(() => [Album])
  async albums(@Root() root: Travel) {
    return await this.albumRepository.find({
      where: { travel: root.entityId },
    });
  }
}
