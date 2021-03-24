import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Lazy } from "../helpers";
import { Album } from "./Album";
import { Destination } from "./Destination";
import { ReactionEntity } from "./ReactionEntitiy";

@ObjectType()
@Entity()
export class Travel {
  @OneToOne(() => ReactionEntity, { lazy: true, primary: true, cascade: true })
  @JoinColumn()
  entity!: Lazy<ReactionEntity>;

  @Column()
  @Field()
  name!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description!: string;

  @OneToMany(() => Destination, (destination) => destination.travel, {
    lazy: true,
  })
  destinations!: Lazy<Destination[]>;

  @OneToMany(() => Album, (album) => album.travel, { lazy: true })
  album!: Lazy<Album[]>;
}
