import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
  JoinTable,
} from "typeorm";
import { Lazy } from "../helpers";
import { Role, ROLE_ENUM } from "./Role";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column()
  @Field()
  firstName?: string;

  @Column()
  @Field()
  lastName?: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  password!: string;

  @Column("boolean", { default: false })
  isActivated!: boolean;

  @ManyToMany(() => Role)
  @Field(() => [ROLE_ENUM])
  @JoinTable()
  roles!: Lazy<Role[]> | ROLE_ENUM[];
}
