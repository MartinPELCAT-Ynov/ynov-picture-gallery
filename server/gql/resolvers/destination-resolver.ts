import { Resolver } from "type-graphql";
import { Service } from "typedi";
import { Destination } from "../entity/Destination";
import { createReactionEntityResolver } from "./abstract-reaction-entity-resolver";

const DestinationEntityResolver = createReactionEntityResolver(
  "destination",
  Destination
);

@Service()
@Resolver(() => Destination)
export class DestinationResolver extends DestinationEntityResolver {}
