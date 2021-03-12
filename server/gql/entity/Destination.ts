import { Photo } from ".";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Travel } from "./Travel";
import { ReactionableEntity } from "./LikeableEntity";
import { Lazy } from "../helpers";

@ObjectType()
@Entity()
export class Destination {
  @PrimaryColumn("uuid")
  @ManyToOne(() => ReactionableEntity, (lk) => lk.uuid, { lazy: true })
  @JoinColumn({ name: "uuid" })
  @Field(() => ReactionableEntity)
  uuid!: Lazy<ReactionableEntity>;

  @Column()
  @Field()
  name!: string;

  @Column("timestamp with time zone")
  @Field()
  arrivalDate!: Date;

  @Column("time with time zone")
  @Field()
  departureDate!: Date;

  location: any; //Voir comment faire: geohash ou longitude et latitudes

  @ManyToMany(() => Photo, (photo) => photo.uuid, { lazy: true })
  @JoinTable()
  @Field(() => [Photo])
  illustrations!: Photo[];

  @ManyToOne(() => Travel, (trvl) => trvl.destinations)
  travel!: Travel;
}
