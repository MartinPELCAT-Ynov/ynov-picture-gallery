import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IReaction, Comment } from ".";
import { Like } from "./Like";

@ObjectType()
@Entity()
export class Photo implements IReaction {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  uuid!: string;

  @Column()
  @Field()
  url!: string;

  likes!: Like[];
  comments!: Comment[];
}
