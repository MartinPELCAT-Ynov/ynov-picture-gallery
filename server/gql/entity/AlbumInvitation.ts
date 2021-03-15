import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class AlbumInvitation {
  @PrimaryGeneratedColumn("uuid")
  public readonly uuid!: string;

  @Field()
  @Column()
  email!: string;
}
