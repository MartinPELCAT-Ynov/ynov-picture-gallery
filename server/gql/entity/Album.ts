import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { AbstractEntity } from ".";

@ObjectType()
@Entity()
export class Album {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  uuid!: string;

  @Column("boolean", { default: false })
  @Field()
  isPublic!: boolean;

  @Column()
  @Field()
  name!: string;

  @ManyToOne(() => AbstractEntity, { nullable: false })
  travel!: AbstractEntity;

  @RelationId((album: Album) => album.travel)
  travelId!: string;
}
