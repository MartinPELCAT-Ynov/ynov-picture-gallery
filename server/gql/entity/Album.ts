import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { AbstractEntity } from ".";
import { Photo } from "./Photo";

@ObjectType()
@Entity()
export class Album {
  @PrimaryGeneratedColumn("uuid", { name: "uuid" })
  @Field()
  uuid!: string;

  @Column("boolean", { default: false })
  @Field()
  isPublic!: boolean;

  @Column()
  @Field()
  name!: string;

  @ManyToMany(() => Photo, { cascade: true })
  @JoinTable()
  photos!: Photo[];

  @ManyToOne(() => AbstractEntity, { nullable: false })
  travel!: AbstractEntity;

  @RelationId((album: Album) => album.travel)
  travelId!: string;
}
