import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Lazy } from "../helpers";
import { ReactionableEntity } from "./LikeableEntity";

@ObjectType()
@Entity()
export class Photo {
  @PrimaryColumn("uuid")
  @ManyToOne(() => ReactionableEntity, (lk) => lk.uuid, { lazy: true })
  @JoinColumn({ name: "uuid" })
  @Field(() => ReactionableEntity)
  uuid!: Lazy<ReactionableEntity>;

  @Column()
  @Field()
  url!: string;
}
