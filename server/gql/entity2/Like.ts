import { Entity, ManyToOne } from "typeorm";
import { Lazy } from "../helpers";
import { ReactionEntity } from "./ReactionEntitiy";
import { User } from "./User";

@Entity()
export class Like {
  @ManyToOne(() => ReactionEntity, { lazy: true, primary: true })
  entity!: Lazy<ReactionEntity>;

  @ManyToOne(() => User, { lazy: true, primary: true })
  user!: Lazy<User>;
}
