import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReactionEntity, User } from ".";
import { Lazy } from "../helpers";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @ManyToOne(() => ReactionEntity, { lazy: true, primary: true })
  entity!: Lazy<ReactionEntity>;

  @ManyToOne(() => User, { lazy: true })
  user!: Lazy<User>;

  @Column()
  content!: string;
}
