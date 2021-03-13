import { KoaContext } from "server/types/koa-types";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Travel, User } from "../entity";
import { ReactionableEntity } from "../entity/ReactionableEntity";
import { CreateTravelInput } from "../inputs/travel-input";

@Resolver(() => Travel)
@Service()
export class TravelResolver {
  constructor(
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
    @InjectRepository(ReactionableEntity)
    private readonly entityRepository: Repository<ReactionableEntity>
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
    const newEntity = this.entityRepository.create();
    const entity = await this.entityRepository.save(newEntity);
    const travel = this.travelRepository.create({
      name,
      description,
      entity: entity.uuid as any,
      user: user,
    });
    return await this.travelRepository.save(travel);
  }
}
