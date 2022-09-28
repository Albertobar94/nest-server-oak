import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID, Length, Matches } from "class-validator";
import { UuidScalar } from "../../scalars/uuid.scalar";

@InputType()
export class CreateTaskDTO {
  @IsString()
  @Length(2, 256)
  @Matches(/^[a-zA-Z &]*$/)
  @IsNotEmpty()
  @Field()
  readonly title: string;

  @IsUUID()
  @Field(() => UuidScalar)
  readonly phaseId: string;

  @IsUUID()
  @Field(() => UuidScalar)
  readonly startupId: string;
}
