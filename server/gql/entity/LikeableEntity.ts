import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReactionableEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;
}
