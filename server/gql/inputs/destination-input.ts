import { Field, InputType } from "type-graphql";
import { Destination } from "../entity/Destination";

@InputType()
export class CreateDestinationInput implements Partial<Destination> {
  @Field()
  arrivalDate!: Date;

  @Field()
  departureDate!: Date;

  @Field()
  geohash!: string;

  @Field()
  name!: string;
}
