import { Destination, User, AbstractEntity } from ".";
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
  entityId!: string;

  @Column()
  @Field()
  name!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description!: string;

  @OneToMany(() => Destination, (destination) => destination.travel)
  destinations!: Destination[];

  @ManyToOne(() => User, {
    nullable: false,
  })
  user!: User;
}
