import { randomUUID } from "crypto";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { plainToInstance } from "class-transformer";
import { UuidScalar } from "../../scalars/uuid.scalar";

type TaskProps = {
  title: string;
  phaseId: string;
  startupId: string;
} & Partial<TaskEntity>;

@ObjectType()
export class TaskEntity {
  @Field(() => UuidScalar)
  readonly id: string;
  @Field()
  readonly title: string;
  @Field(() => Int)
  readonly sequence: number;
  @Field(() => UuidScalar)
  readonly phaseId: string;
  @Field(() => UuidScalar)
  readonly startupId: string;
  @Field()
  readonly done: boolean;

  public static create(data: TaskProps): TaskEntity {
    const done = false;
    const id = data.id ?? randomUUID();
    const sequence = data.sequence ?? 0;

    return plainToInstance(TaskEntity, { ...data, id, sequence, done });
  }

  public static setDone(data: Required<TaskEntity>) {
    return plainToInstance(TaskEntity, { ...data, done: true });
  }

  public static setUndone(data: Required<TaskEntity>) {
    return plainToInstance(TaskEntity, { ...data, done: false });
  }
}
