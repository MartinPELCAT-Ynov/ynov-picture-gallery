import { Photo, Travel } from ".";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Destination {
  @PrimaryGeneratedColumn("uuid")
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
  @Field(() => [Photo])
  illustrations!: Photo[];

  @ManyToOne(() => Travel, (trvl) => trvl.destinations)
  travel!: Travel;
}
