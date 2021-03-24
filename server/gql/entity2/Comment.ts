import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lazy } from "../helpers";
import { ReactionEntity } from "./ReactionEntitiy";
import { User } from "./User";

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
