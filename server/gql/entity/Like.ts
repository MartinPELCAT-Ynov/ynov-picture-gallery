import { ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from ".";

@ObjectType()
@Entity()
export class Like {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  user!: User;
}
