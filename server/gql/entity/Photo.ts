import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Lazy } from "../helpers";
import { ReactionableEntity } from "./LikeableEntity";

@ObjectType()
@Entity()
export class Photo {
  @PrimaryColumn("uuid")
  @ManyToOne(() => ReactionableEntity, (lk) => lk.uuid, { lazy: true })
  @JoinColumn({ name: "entity" })
  @Field(() => ReactionableEntity)
  entity!: Lazy<ReactionableEntity>;

  @Column()
  @Field()
  url!: string;
}
