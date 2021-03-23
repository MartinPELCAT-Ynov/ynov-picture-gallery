import { Photo, ReactionEntity, Travel } from ".";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Lazy } from "../helpers";

@ObjectType()
@Entity()
export class Destination {
  @OneToOne(() => ReactionEntity, { lazy: true, primary: true, cascade: true })
  @JoinColumn()
  entity!: Lazy<ReactionEntity>;

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

  @ManyToOne(() => Travel, (trvl) => trvl.destinations, { lazy: true })
  travel!: Lazy<Travel>;

  @ManyToMany(() => Photo, { cascade: true, lazy: true })
  @JoinTable()
  illu!: Lazy<Photo[]>;
}
