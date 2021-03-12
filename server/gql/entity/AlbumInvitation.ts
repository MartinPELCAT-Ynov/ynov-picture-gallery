import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Album } from ".";
import { Lazy } from "../helpers";

@ObjectType()
@Entity()
export class AlbumInvitation {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @ManyToOne(() => Album, (album) => album.albumInvitations, { lazy: true })
  album!: Lazy<Album>;

  @Field()
  @Column()
  email!: string;
}
