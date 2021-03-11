import { User } from "../entity/User";
import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getRepository, Repository } from "typeorm";
import { Role } from "../entity/Role";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(() => [User], { nullable: true })
  async users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @FieldResolver()
  async roles(@Root() user: User): Promise<string[]> {
    const found = await getRepository(User).findOne(user.id, {
      relations: ["roles"],
    });
    const roles = (await found!.roles) as Role[];
    const formatedRoles = roles.map((rle) => rle.name);
    return formatedRoles;
  }
}
