import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { Lazy } from "../helpers";
import { ReactionEntity } from "./ReactionEntitiy";

@ObjectType()
@Entity()
export class Photo {
  @OneToOne(() => ReactionEntity, {
    lazy: true,
    primary: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  entity!: Lazy<ReactionEntity>;

  @RelationId((photo: Photo) => photo.entity)
  @Field()
  uuid?: string;

  @Field()
  @Column()
  name!: string;

  @Column({ unique: true })
  @Field()
  url!: string;

  @Column()
  provider!: string;
}
