import {
  BaseEntity,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User, Comment, Like } from ".";
import { Lazy } from "../helpers";

@Entity()
export class ReactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @OneToMany(() => Like, (like) => like.entity, { lazy: true })
  likes!: Lazy<Like[]>;

  @OneToMany(() => Comment, (comment) => comment.entity, { lazy: true })
  comments!: Lazy<Comment[]>;

  @ManyToOne(() => User, { lazy: true })
  user!: Lazy<User>;
}
