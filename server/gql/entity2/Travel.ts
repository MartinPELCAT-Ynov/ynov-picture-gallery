import { Destination, User, Album } from ".";
import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { ReactionEntity } from ".";
import { Lazy } from "../helpers";

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

  @OneToMany(() => Destination, (destination) => destination.travel)
  destinations!: Destination[];

  @OneToMany(() => Album, (album) => album.travel)
  album!: Album;

  @ManyToOne(() => User, { nullable: false, lazy: true })
  user!: Lazy<User>;
}
