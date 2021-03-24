import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  readonly uuid!: string;

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
}
