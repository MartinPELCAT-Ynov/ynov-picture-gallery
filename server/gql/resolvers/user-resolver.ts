import { User } from "../entity/User";
import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Travel } from "../entity";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>
  ) {}

  @Query(() => [User], { nullable: true })
  async users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @FieldResolver(() => [Travel])
  async travels(@Root() user: User) {
    const travels = await this.travelRepository.find({
      where: { user },
    });
    return travels;
  }
}
