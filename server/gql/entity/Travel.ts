import { Destination, User, AbstractEntity, Album } from ".";
import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  RelationId,
} from "typeorm";

@ObjectType()
@Entity()
export class Travel {
  @OneToOne(() => AbstractEntity, { primary: true, cascade: true })
  @JoinColumn()
  entity!: AbstractEntity;

  @RelationId((travel: Travel) => travel.entity)
  @Field()
  uuid!: string;

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

  @ManyToOne(() => User, {
    nullable: false,
  })
  user!: User;

  @RelationId((travel: Travel) => travel.user)
  userId!: string;
}
