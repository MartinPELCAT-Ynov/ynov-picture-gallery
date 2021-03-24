import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { Lazy } from "../helpers";
import { Album } from "./Album";

@ObjectType()
@Entity()
export class Invitation {
  @ManyToOne(() => Album, {
    lazy: true,
    primary: true,
  })
  @Field(() => Album)
  album!: Lazy<Album>;

  @Column({ primary: true })
  @Field()
  email!: string;
}
