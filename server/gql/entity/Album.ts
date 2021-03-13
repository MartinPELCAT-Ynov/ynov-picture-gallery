import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Photo, AlbumInvitation, Travel } from ".";

@ObjectType()
@Entity()
export class Album {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @Column("boolean")
  @Field()
  public!: boolean;

  @ManyToMany(() => Photo)
  @JoinTable()
  @Field(() => [Photo])
  photos!: Photo[];

  @OneToMany(() => AlbumInvitation, (albumInvite) => albumInvite.album)
  @Field(() => [AlbumInvitation])
  albumInvitations!: AlbumInvitation[];

  @ManyToOne(() => Travel, (trvl) => trvl.albums)
  travel!: Travel;
}
