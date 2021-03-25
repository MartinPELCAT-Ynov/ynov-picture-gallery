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
import { getRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Album } from "../entity/Album";
import { Comment } from "../entity/Comment";
import { Destination } from "../entity/Destination";
import { Like } from "../entity/Like";
import {
  ReactionEntitiyResolver,
  ReactionEntity,
} from "../entity/ReactionEntitiy";
import { Travel } from "../entity/Travel";
import { User } from "../entity/User";
import { CreateDestinationInput } from "../inputs/destination-input";
import { CreateTravelInput } from "../inputs/travel-input";

@Resolver(() => Travel)
@Service()
export class TravelResolver implements ReactionEntitiyResolver {
  constructor(
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Travel>,
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>
  ) {}

  @Query(() => [Travel])
  @Authorized()
  async myTravels(@Ctx() { session }: KoaContext) {
    const user = session!.user as User;
    const travels = this.travelRepository
      .createQueryBuilder("travel")
      .leftJoin("travel.entity", "reactionentity")
      .where("reactionentity.owner = :userUuid", { userUuid: user.uuid })
      .getMany();
    return travels;
  }

  @Mutation(() => Travel, { nullable: true })
  @Authorized()
  async createTravel(
    @Arg("input") { name, description }: CreateTravelInput,
    @Ctx() { session }: KoaContext
  ) {
    const user: User = session!.user;

    const travel = this.travelRepository.create({
      albums: [],
      description,
      name,
      entity: ReactionEntity.create({ owner: user }),
    });
    return this.travelRepository.save(travel);
  }

  @Query(() => Travel)
  async getTravel(@Arg("id") id: string) {
    const travel = await this.travelRepository
      .createQueryBuilder("travel")
      .leftJoinAndSelect("travel.entity", "reactionentity")
      .where("reactionentity.uuid = :id", { id })
      .getOneOrFail();
    return travel;
  }

  @Mutation(() => Destination)
  @Authorized()
  async createDestination(
    @Arg("travelId") travelId: string,
    @Arg("dest") destination: CreateDestinationInput,
    @Ctx() { session }: KoaContext
  ) {
    const owner = session!.user as User;
    const newDestination = this.destinationRepository.create({
      entity: ReactionEntity.create({ owner }),
      arrivalDate: destination.arrivalDate,
      departureDate: destination.departureDate,
      geohash: destination.geohash,
      name: destination.name,
      travel: (travelId as unknown) as Travel,
      illu: [],
    });

    return this.destinationRepository.save(newDestination);
  }

  @FieldResolver(() => [Like])
  async likes(@Root() travel: Travel): Promise<Like[]> {
    const entity = await travel.entity;
    return entity.likes;
  }
  comments(): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  owner(): Promise<User> {
    throw new Error("Method not implemented.");
  }
  @FieldResolver(() => Int)
  async albumsCount(@Root() travel: Travel) {
    const count = await this.albumRepository.count({
      where: { travel: travel.uuid },
    });
    return count;
  }

  @FieldResolver(() => [Destination])
  async destinations(@Root() destination: Destination) {
    const destRepo = getRepository(Destination);
    const dests = destRepo.find({ where: { travel: destination.uuid } });
    return dests;
  }

  @FieldResolver(() => Int)
  async likeCounts() {
    return 9;
  }
}
