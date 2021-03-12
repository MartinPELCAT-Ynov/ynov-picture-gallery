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
import { ReactionableEntity } from "./LikeableEntity";

@ObjectType()
@Entity()
export class Comment {
  @PrimaryColumn("uuid")
  @ManyToOne(() => ReactionableEntity, (lk) => lk.uuid)
  @JoinColumn({ name: "entity_uuid" })
  @Field()
  entity_uuid!: string;

  @PrimaryGeneratedColumn("uuid")
  @Field()
  uuid!: string;

  @ManyToOne(() => User, { lazy: true })
  @Field(() => User)
  user!: User;

  @Field()
  @Column()
  content!: string;
}
