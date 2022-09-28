import { InMemoryData } from "./memory-data";
import { TaskRepository } from "./task.repository";
import { PhaseRepository } from "./phase.repository";
import { StartupRepository } from "./startup.repository";

export const Repositories = [
  StartupRepository,
  PhaseRepository,
  TaskRepository,
  InMemoryData,
];
