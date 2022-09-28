import { randomUUID } from "crypto";
import { plainToInstance } from "class-transformer";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { TaskEntity } from "./task.entity";
import { UuidScalar } from "../../scalars/uuid.scalar";

type PhaseProps = { startupId: string; title: string } & Partial<PhaseEntity>;

@ObjectType()
export class PhaseEntity {
  @Field(() => UuidScalar)
  readonly id: string;
  @Field()
  readonly title: string;
  @Field(() => Int)
  readonly sequence: number;
  @Field(() => UuidScalar)
  readonly startupId: string;
  @Field()
  readonly done: boolean;
  @Field(() => [TaskEntity])
  readonly tasks?: TaskEntity[];

  public static create(data: PhaseProps): PhaseEntity {
    const id = data.id ?? randomUUID();
    const done = false;
    const sequence = data.sequence ?? 0;

    return plainToInstance(PhaseEntity, { ...data, id, sequence, done });
  }

  public static setDone(data: Required<Omit<PhaseEntity, "tasks">>) {
    return plainToInstance(TaskEntity, { ...data, done: true });
  }

  public static setUndone(data: Required<Omit<PhaseEntity, "tasks">>) {
    return plainToInstance(TaskEntity, { ...data, done: false });
  }
}
