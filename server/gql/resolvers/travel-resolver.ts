import { KoaContext } from "server/types/koa-types";
import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Travel, User } from "../entity";

@Resolver(() => Travel)
@Service()
export class TravelResolver {
  constructor(
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>
  ) {}

  @Query(() => [Travel])
  @Authorized()
  async myTravels(@Ctx() { session }: KoaContext) {
    const sessionUser = session!.user as User;
    return this.travelRepository.find({ where: { user: sessionUser.uuid } });
  }
}
