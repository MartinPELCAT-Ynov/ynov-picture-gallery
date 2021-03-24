import { Field, ObjectType } from "type-graphql";
import { Entity, ManyToOne } from "typeorm";
import { Lazy } from "../helpers";
import { ReactionEntity } from "./ReactionEntitiy";
import { User } from "./User";

@Entity()
@ObjectType()
export class Like {
  @ManyToOne(() => ReactionEntity, { lazy: true, primary: true })
  entity!: Lazy<ReactionEntity>;

  @ManyToOne(() => User, { lazy: true, primary: true })
  @Field(() => User)
  user!: Lazy<User>;
}
