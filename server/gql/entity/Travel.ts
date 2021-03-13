import { Destination, Album, User, AbstractEntity } from ".";
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
  @JoinColumn({ name: "entity" })
  entity!: AbstractEntity;

  @RelationId((travel: Travel) => travel.entity)
  entityId!: string;

  @Column()
  @Field()
  name!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description!: string;

  @OneToMany(() => Destination, (destination) => destination.travel)
  @Field(() => [Destination])
  destinations!: Destination[];

  @OneToMany(() => Album, (album) => album.travel)
  @Field(() => [Album])
  albums!: Album[];

  @ManyToOne(() => User, {
    nullable: false,
  })
  @Field(() => User)
  user!: User;
}
