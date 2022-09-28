import { randomUUID } from "crypto";
import { Field, ObjectType } from "@nestjs/graphql";
import { plainToInstance } from "class-transformer";
import { PhaseEntity } from "./phase.entity";
import { UuidScalar } from "../../scalars/uuid.scalar";

type StartupProps = { name: string } & Partial<StartupEntity>;

@ObjectType()
export class StartupEntity {
  @Field(() => UuidScalar)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field(() => [PhaseEntity])
  readonly progress?: PhaseEntity[];

  public static create(data: StartupProps): StartupEntity {
    const id = randomUUID();

    return plainToInstance(StartupEntity, { ...data, id });
  }
}
