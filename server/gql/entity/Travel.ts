import { Destination, Album } from ".";
import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Lazy } from "../helpers";
import { ReactionableEntity } from "./LikeableEntity";

@ObjectType()
@Entity()
export class Travel {
  @PrimaryColumn("uuid")
  @ManyToOne(() => ReactionableEntity, (lk) => lk.uuid)
  @JoinColumn({ name: "uuid" })
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
}
