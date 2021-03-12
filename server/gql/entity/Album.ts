import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IReaction, Photo, AlbumInvitation, Like, Comment } from ".";
import { Lazy } from "../helpers";
import { Travel } from "./Travel";

@ObjectType()
@Entity()
export class Album implements IReaction {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  uuid!: string;

  @Column("boolean")
  @Field()
  public!: boolean;

  @ManyToMany(() => Photo, { lazy: true })
  @JoinTable()
  @Field(() => [Photo])
  photos!: Lazy<Photo[]>;

  @OneToMany(() => AlbumInvitation, (albumInvite) => albumInvite.album, {
    lazy: true,
  })
  @Field(() => [AlbumInvitation])
  albumInvitations!: AlbumInvitation[];

  @ManyToOne(() => Travel, (trvl) => trvl.albums, { lazy: true })
  travel!: Lazy<Travel>;

  likes!: Like[];
  comments!: Comment[];
}
