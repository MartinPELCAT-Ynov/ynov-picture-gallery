import {
  BaseEntity,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lazy } from "../helpers";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";

@Entity()
export class ReactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @OneToMany(() => Like, (like) => like.entity, { lazy: true })
  likes!: Lazy<Like[]>;

  @OneToMany(() => Comment, (comment) => comment.entity, { lazy: true })
  comments!: Lazy<Comment[]>;

  @ManyToOne(() => User, { lazy: true })
  owner!: Lazy<User>;
}
