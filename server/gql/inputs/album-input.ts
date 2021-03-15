import { Field, InputType } from "type-graphql";
import { Album } from "../entity";

@InputType()
export class CreateAlbumInput implements Partial<Album> {
  @Field()
  travelId!: string;

  @Field()
  name!: string;
}
