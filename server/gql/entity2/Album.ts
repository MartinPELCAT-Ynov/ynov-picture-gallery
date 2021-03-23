import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Photo, Travel, ReactionEntity } from ".";
import { Lazy } from "../helpers";

@ObjectType()
@Entity()
export class Album {
  @OneToOne(() => ReactionEntity, { lazy: true, primary: true, cascade: true })
  @JoinColumn()
  entity!: Lazy<ReactionEntity>;

  @Column("boolean", { default: false })
  @Field()
  isPublic!: boolean;

  @Column()
  @Field()
  name!: string;

  @ManyToMany(() => Photo, { cascade: true, lazy: true })
  @JoinTable()
  photos!: Lazy<Photo[]>;

  // relation
  @ManyToOne(() => Travel, { lazy: true })
  travel!: Lazy<Travel>;
}
