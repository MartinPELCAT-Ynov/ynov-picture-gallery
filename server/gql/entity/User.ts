import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Travel } from "./Travel";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  uuid!: string;

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

  @OneToMany(() => Travel, (travel) => travel.user)
  travels!: Travel[];
}
