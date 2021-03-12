import { Field, ObjectType } from "type-graphql";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from ".";
import { Lazy } from "../helpers";
import { ReactionableEntity } from "./LikeableEntity";

@ObjectType()
@Entity()
export class Like {
  @PrimaryColumn("uuid")
  @ManyToOne(() => ReactionableEntity, (lk) => lk.uuid, { lazy: true })
  @JoinColumn({ name: "entity_uuid" })
  @Field(() => ReactionableEntity)
  entity_uuid!: Lazy<ReactionableEntity>;

  @ManyToOne(() => User, { lazy: true, primary: true })
  @Field(() => User)
  user!: Lazy<User>;
}
