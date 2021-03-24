import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lazy } from "../helpers";
import { ReactionEntity } from "./ReactionEntitiy";
import { User } from "./User";

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  uuid!: string;

  @ManyToOne(() => ReactionEntity, { lazy: true, primary: true })
  entity!: Lazy<ReactionEntity>;

  @ManyToOne(() => User, { lazy: true })
  @Field(() => User)
  user!: Lazy<User>;

  @Column()
  @Field()
  content!: string;
}
