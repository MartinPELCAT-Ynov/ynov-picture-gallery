import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  getRepository,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { AbstractEntity, User, Photo, Travel } from ".";

@ObjectType()
@Entity()
export class Album {
  @PrimaryGeneratedColumn("uuid", { name: "uuid" })
  @Field()
  uuid!: string;

  @Column("boolean", { default: false })
  @Field()
  isPublic!: boolean;

  @Column()
  @Field()
  name!: string;

  @ManyToMany(() => Photo, { cascade: true })
  @JoinTable()
  photos!: Photo[];

  @ManyToOne(() => AbstractEntity, { nullable: false })
  travel!: AbstractEntity;

  @RelationId((album: Album) => album.travel)
  travelId!: string;

  public async getOwner(): Promise<User> {
    const travel = await getRepository(Travel).findOne({
      where: { entity: this.travelId },
      relations: ["user"],
    });
    if (!travel) throw new Error("Faild to fetch user");
    return travel.user;
  }
}
