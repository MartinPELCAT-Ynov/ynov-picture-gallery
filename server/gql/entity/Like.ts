import { Field, ObjectType } from "type-graphql";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from ".";
import { ReactionableEntity } from "./LikeableEntity";

@ObjectType()
@Entity()
export class Like {
  @PrimaryColumn("uuid")
  @ManyToOne(() => ReactionableEntity, (lk) => lk.uuid)
  @JoinColumn({ name: "entity_uuid" })
  @Field()
  entity_uuid!: string;

  @ManyToOne(() => User, { lazy: true, primary: true })
  @Field(() => User)
  user!: User;
}
