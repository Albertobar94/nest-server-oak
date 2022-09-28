import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID, Length, Matches } from "class-validator";
import { UuidScalar } from "../../scalars/uuid.scalar";

@InputType()
export class CreatePhaseDTO {
  @IsString()
  @Length(2, 256)
  @Matches(/^[a-zA-Z &]*$/)
  @IsNotEmpty()
  @Field()
  readonly title: string;

  @IsUUID("4")
  @Field(() => UuidScalar)
  readonly startupId: string;
}
