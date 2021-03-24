import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  RelationId,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Lazy } from "../helpers";
import { Travel } from "./Travel";
import { ReactionEntity } from "./ReactionEntitiy";
import { Photo } from "./Photo";

@ObjectType()
@Entity()
export class Destination {
  @OneToOne(() => ReactionEntity, { lazy: true, primary: true, cascade: true })
  @JoinColumn()
  entity!: Lazy<ReactionEntity>;

  @RelationId((dest: Destination) => dest.entity)
  @Field()
  uuid?: string;

  @Column()
  @Field()
  name!: string;

  @Column("timestamp with time zone")
  @Field()
  arrivalDate!: Date;

  @Column("timestamp with time zone")
  @Field()
  departureDate!: Date;

  location: any; //Voir comment faire: geohash ou longitude et latitudes

  @ManyToOne(() => Travel, { lazy: true })
  @Field(() => Travel)
  travel!: Lazy<Travel>;

  @ManyToMany(() => Photo, { cascade: true, lazy: true })
  @JoinTable()
  @Field(() => [Photo])
  illu!: Lazy<Photo[]>;
}
