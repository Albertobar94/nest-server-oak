import { TaskResolver } from "./task.resolver";
import { PhaseResolver } from "./phase.resolver";
import { StartupResolver } from "./startup.resolver";

export const Resolvers = [StartupResolver, PhaseResolver, TaskResolver];
