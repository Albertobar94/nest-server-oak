import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

@InputType()
export class CreateStartupDTO {
  @IsString()
  @Length(2, 256)
  @Matches(/^[a-zA-Z &]*$/)
  @IsNotEmpty()
  @Field()
  readonly name: string;
}
