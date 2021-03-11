import { EmailService } from "../../services/email-service";
import { KoaContext } from "server/types/koa-types";
import { isValidPassword, hashPassword } from "../../utils/password-utils";
import {
  Arg,
  Ctx,
  ForbiddenError,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { SucessObject } from "../inputs/sucess-object";
import { LoginInput, RegisterInput } from "../inputs/user-inputs";
import { BASE64_SEPARATOR } from "../../utils/mailer-utils";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
@Resolver()
export class AuthResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService
  ) {}

  @Mutation(() => User)
  async login(
    @Arg("input") { email, password }: LoginInput,
    @Ctx() { session }: KoaContext
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ["roles"],
    });

    if (!user) throw new Error("User not found");
    if (!user.isActivated) throw new Error("This account is not activated");
    const isValid = await isValidPassword(password, user.password);
    if (!isValid) throw new Error("User not found");
    user.password = undefined!;
    session!.user = user;
    return user;
  }

  @Mutation(() => SucessObject)
  async register(
    @Arg("input") args: RegisterInput,
    @Ctx() req: KoaContext
  ): Promise<SucessObject> {
    args.password = await hashPassword(args.password);
    const user = await this.userRepository.create(args).save();
    await this.emailService.sendRegisterConfirmation(user, req.origin);
    return { success: true };
  }

  @Mutation(() => SucessObject)
  async logout(@Ctx() req: KoaContext): Promise<SucessObject> {
    req.session = null;
    return { success: true };
  }

  @Query(() => User)
  me(@Ctx() { session }: KoaContext) {
    if (!session?.user) throw new ForbiddenError();
    return this.userRepository.findOne(session.user.id);
  }

  @Mutation(() => SucessObject)
  async validateEmail(@Arg("key") key: String): Promise<SucessObject> {
    const buff = Buffer.from(key, "base64");
    const fullString = buff.toString("ascii");
    const [id, email] = fullString.split(BASE64_SEPARATOR);
    const user = await this.userRepository.findOne({ where: { id, email } });
    if (!user) throw new Error("This key in not valid");
    if (user.isActivated) return { success: true };
    user.isActivated = true;
    await user.save();
    return { success: true };
  }
}
