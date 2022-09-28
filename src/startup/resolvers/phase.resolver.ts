import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { TaskEntity } from "../entities/task.entity";
import { PhaseEntity } from "../entities/phase.entity";
import { TaskService } from "../services/task.service";
import { PhaseService } from "../services/phase.service";
import { QueryArgs } from "../interfaces/queryArgs.args";
import { CreatePhaseDTO } from "../interfaces/create-phase.dto";
import { FormatStringPipe } from "../../pipes/format-string.pipe";

@Resolver(() => PhaseEntity)
export class PhaseResolver {
  constructor(
    private readonly phaseService: PhaseService,
    private readonly taskService: TaskService,
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                  Mutations                                 */
  /* -------------------------------------------------------------------------- */

  @Mutation(() => [PhaseEntity])
  createPhase(
    @Args("createPhaseInput", FormatStringPipe)
    createPhaseInput: CreatePhaseDTO,
  ) {
    return this.phaseService.create(createPhaseInput);
  }

  @Mutation(() => [PhaseEntity])
  removePhase(@Args() { id }: QueryArgs) {
    return this.phaseService.delete(id);
  }

  @Mutation(() => [TaskEntity])
  setPhaseDone(@Args() { id }: QueryArgs) {
    return this.phaseService.setPhaseDone(id);
  }

  @Mutation(() => [PhaseEntity])
  setPhaseUndone(@Args() { id }: QueryArgs) {
    return this.phaseService.setPhaseUndone(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Queries                                  */
  /* -------------------------------------------------------------------------- */

  @Query(() => [PhaseEntity], { name: "phase" })
  getOne(@Args() { id }: QueryArgs) {
    return this.phaseService.getById(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                               Field Resolvers                              */
  /* -------------------------------------------------------------------------- */

  @ResolveField(() => [TaskEntity], { name: "tasks" })
  getTasks(@Parent() phase: PhaseEntity) {
    return this.taskService.getAllByPhaseId(phase.id);
  }
}
