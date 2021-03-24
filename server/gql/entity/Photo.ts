import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Lazy } from "../helpers";
import { ReactionEntity } from "./ReactionEntitiy";

@ObjectType()
@Entity()
export class Photo {
  @OneToOne(() => ReactionEntity, { lazy: true, primary: true, cascade: true })
  @JoinColumn()
  entity!: Lazy<ReactionEntity>;

  @Field()
  @Column()
  name!: string;

  @Column()
  @Field()
  url!: string;

  @Column()
  provider!: string;
}
