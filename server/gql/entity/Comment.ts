import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from ".";
import { Lazy } from "../helpers";
import { ReactionableEntity } from "./LikeableEntity";

@ObjectType()
@Entity()
export class Comment {
  @PrimaryColumn("uuid")
  @ManyToOne(() => ReactionableEntity, (lk) => lk.uuid, { lazy: true })
  @JoinColumn({ name: "entity_uuid" })
  @Field(() => ReactionableEntity)
  entity_uuid!: Lazy<ReactionableEntity>;

  @PrimaryGeneratedColumn("uuid")
  @Field()
  uuid!: string;

  @ManyToOne(() => User, { lazy: true })
  @Field(() => User)
  user!: Lazy<User>;

  @Field()
  @Column()
  content!: string;
}
