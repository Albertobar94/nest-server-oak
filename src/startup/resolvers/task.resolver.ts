import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { TaskEntity } from "../entities/task.entity";
import { TaskService } from "../services/task.service";
import { QueryArgs } from "../interfaces/queryArgs.args";
import { CreateTaskDTO } from "../interfaces/create-task.dto";
import { FormatStringPipe } from "../../pipes/format-string.pipe";

@Resolver(() => TaskEntity)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  /* -------------------------------------------------------------------------- */
  /*                                  Mutations                                 */
  /* -------------------------------------------------------------------------- */

  @Mutation(() => [TaskEntity])
  createTask(
    @Args("createTaskInput", FormatStringPipe) createTaskInput: CreateTaskDTO,
  ) {
    return this.taskService.create(createTaskInput);
  }

  @Mutation(() => [TaskEntity])
  removeTask(@Args() { id }: QueryArgs) {
    return this.taskService.delete(id);
  }

  @Mutation(() => [TaskEntity])
  setTaskDone(@Args() { id }: QueryArgs) {
    return this.taskService.setTaskDone(id);
  }

  @Mutation(() => [TaskEntity])
  setTaskUndone(@Args() { id }: QueryArgs) {
    return this.taskService.setTaskUndone(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Queries                                  */
  /* -------------------------------------------------------------------------- */

  @Query(() => [TaskEntity], { name: "task" })
  getOne(@Args() { id }: QueryArgs) {
    return this.taskService.getById(id);
  }
}
