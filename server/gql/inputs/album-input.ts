import { Field, InputType } from "type-graphql";
import { Album } from "../entity/Album";

@InputType()
export class CreateAlbumInput implements Partial<Album> {
  @Field()
  travelId!: string;

  @Field()
  name!: string;
}
