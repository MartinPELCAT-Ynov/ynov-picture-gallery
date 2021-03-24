import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  RelationId,
} from "typeorm";
import { Lazy } from "../helpers";
import { Album } from "./Album";
import { ReactionEntity } from "./ReactionEntitiy";

@ObjectType()
@Entity()
export class Travel {
  @OneToOne(() => ReactionEntity, { lazy: true, primary: true, cascade: true })
  @JoinColumn()
  entity!: Lazy<ReactionEntity>;

  @RelationId((trv: Travel) => trv.entity)
  @Field()
  uuid?: string;

  @Column()
  @Field()
  name!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description!: string;

  @OneToMany(() => Album, (album) => album.travel, { lazy: true })
  @Field(() => [Album])
  albums!: Lazy<Album[]>;
}
