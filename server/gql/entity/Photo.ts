import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ReactionableEntity } from "./LikeableEntity";

@ObjectType()
@Entity()
export class Photo {
  @PrimaryColumn("uuid")
  @ManyToOne(() => ReactionableEntity, (lk) => lk.uuid)
  @JoinColumn({ name: "uuid" })
  @Field()
  uuid!: string;

  @Column()
  @Field()
  url!: string;
}
