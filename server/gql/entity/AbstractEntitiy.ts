import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;
}
