import { Field, InputType } from "type-graphql";
import { User } from "../entity/User";

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}
