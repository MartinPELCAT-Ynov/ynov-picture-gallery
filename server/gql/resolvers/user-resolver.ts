import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { Travel } from "../entity/Travel";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = this.userRepository.find();
    return users;
  }

  @FieldResolver(() => [Travel])
  async travels(@Root() user: User) {
    const travels = await this.travelRepository
      .createQueryBuilder("travel")
      .leftJoinAndSelect("travel.entity", "reactionentity")
      .where("reactionentity.owner = :userUuid", { userUuid: user.uuid })
      .getMany();
    return travels;
  }
}
