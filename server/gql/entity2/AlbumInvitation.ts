import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Lazy } from "../helpers";
import { Album } from ".";

@ObjectType()
@Entity()
export class AlbumInvitation {
  @OneToOne(() => Album, { lazy: true, primary: true, cascade: true })
  @JoinColumn()
  album!: Lazy<Album>;

  @Field()
  @Column({ primary: true })
  email!: string;
}
