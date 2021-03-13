import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Album } from ".";

@ObjectType()
@Entity()
export class AlbumInvitation {
  @PrimaryGeneratedColumn("uuid")
  public readonly uuid!: string;

  @ManyToOne(() => Album, (album) => album.albumInvitations)
  album!: Album;

  @Field()
  @Column()
  email!: string;
}
