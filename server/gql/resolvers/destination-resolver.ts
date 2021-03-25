import { Resolver } from "type-graphql";
import { Service } from "typedi";
import { Destination } from "../entity/Destination";

@Service()
@Resolver(() => Destination)
export class DestinationResolver {}
