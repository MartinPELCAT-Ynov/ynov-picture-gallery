import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SucessObject {
  @Field()
  success!: boolean;
}
