import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { QueryArgs } from "../interfaces/queryArgs.args";
import { PhaseEntity } from "../entities/phase.entity";
import { StartupEntity } from "./../entities/startup.entity";
import { PhaseService } from "../services/phase.service";
import { StartupService } from "../services/startup.service";
import { CreateStartupDTO } from "../interfaces/create-startup.dto";
import { FormatStringPipe } from "../../pipes/format-string.pipe";

@Resolver(() => StartupEntity)
export class StartupResolver {
  constructor(
    private readonly startupService: StartupService,
    private readonly phaseService: PhaseService,
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                  Mutations                                 */
  /* -------------------------------------------------------------------------- */

  @Mutation(() => [StartupEntity])
  createStartup(
    @Args("createStartupInput", FormatStringPipe)
    createStartupInput: CreateStartupDTO,
  ) {
    return this.startupService.create(createStartupInput);
  }

  @Mutation(() => [StartupEntity])
  removeStartup(@Args() { id }: QueryArgs) {
    return this.startupService.delete(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Queries                                  */
  /* -------------------------------------------------------------------------- */

  @Query(() => [StartupEntity], { name: "startups" })
  getAll() {
    return this.startupService.getAll();
  }

  @Query(() => [StartupEntity], { name: "startup" })
  getOne(@Args() { id }: QueryArgs) {
    return this.startupService.getById(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                               Field Resolvers                              */
  /* -------------------------------------------------------------------------- */

  @ResolveField(() => [PhaseEntity], { name: "progress" })
  getProgress(@Parent() startup: StartupEntity) {
    return this.phaseService.getAllByStartupId(startup.id);
  }
}
