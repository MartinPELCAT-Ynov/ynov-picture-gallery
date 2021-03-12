import { IReaction, Photo, Like, Comment } from ".";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Travel } from "./Travel";

@ObjectType()
@Entity()
export class Destination implements IReaction {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  uuid!: string;

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

  @ManyToMany(() => Photo)
  @JoinTable()
  illustrations!: Photo[];

  @ManyToOne(() => Travel, (trvl) => trvl.destinations)
  travel!: Travel;

  likes!: Like[];
  comments!: Comment[];
}
