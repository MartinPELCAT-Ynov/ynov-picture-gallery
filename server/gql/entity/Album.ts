import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Photo, AlbumInvitation } from ".";
import { Lazy } from "../helpers";
import { ReactionableEntity } from "./LikeableEntity";
import { Travel } from "./Travel";

@ObjectType()
@Entity()
export class Album {
  @PrimaryColumn("uuid")
  @ManyToOne(() => ReactionableEntity, (lk) => lk.uuid)
  @JoinColumn({ name: "uuid" })
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
}
