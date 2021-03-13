import { Field, InputType } from "type-graphql";
import { Travel } from "../entity";

@InputType()
export class CreateTravelInput implements Partial<Travel> {
  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;
}
