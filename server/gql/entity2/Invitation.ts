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
    cascade: true,
  })
  album!: Lazy<Album>;

  @Field()
  @Column({ primary: true })
  email!: string;
}
