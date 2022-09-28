import { IsUUID } from "class-validator";
import { Field, ArgsType } from "@nestjs/graphql";
import { UuidScalar } from "../../scalars/uuid.scalar";

@ArgsType()
export class QueryArgs {
  @IsUUID("4")
  @Field(() => UuidScalar)
  readonly id: string;
}
