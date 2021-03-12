import { IReaction, Comment, Like, Destination, Album } from ".";

import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lazy } from "../helpers";

@ObjectType()
@Entity()
export class Travel implements IReaction {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  uuid!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  description!: string;

  @OneToMany(() => Destination, (destination) => destination.travel, {
    lazy: true,
  })
  @Field(() => [Destination])
  destinations!: Lazy<Destination[]>;

  @OneToMany(() => Album, (album) => album.travel, { lazy: true })
  @Field(() => [Album])
  albums!: Lazy<Album[]>;

  likes!: Like[];
  comments!: Comment[];
}
