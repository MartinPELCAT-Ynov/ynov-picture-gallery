import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Photo {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  uuid!: string;

  @Field()
  @Column()
  name!: string;

  @Column()
  @Field()
  url!: string;
}
