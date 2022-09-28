import { Injectable, NotFoundException } from "@nestjs/common";
import { StartupEntity } from "../entities/startup.entity";
import { TaskRepository } from "../repository/task.repository";
import { PhaseRepository } from "../repository/phase.repository";
import { StartupRepository } from "../repository/startup.repository";

type CreateStartupArgs = Omit<StartupEntity, "id">;

@Injectable()
export class StartupService {
  constructor(
    private readonly startupRepository: StartupRepository,
    private readonly phaseRepository: PhaseRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  async create(data: CreateStartupArgs): Promise<StartupEntity[]> {
    const exists = await this.startupRepository.getByName(data.name);
    if (exists.length > 0) {
      return exists;
    }

    const startupEntity = StartupEntity.create(data);
    return this.startupRepository.create(startupEntity);
  }

  async getById(id: string): Promise<StartupEntity[]> {
    return this.startupRepository.getById(id);
  }

  async getByName(name: string): Promise<StartupEntity[]> {
    const startup = await this.startupRepository.getByName(name);

    return startup;
  }

  async getAll(): Promise<StartupEntity[]> {
    return this.startupRepository.getAll();
  }

  async delete(id: string): Promise<void> {
    const [startup] = await this.startupRepository.getById(id);
    if (!startup) {
      throw new NotFoundException(
        "Please check the startup id as it may be incorrect",
      );
    }

    const allPhases = await this.taskRepository.getAllByStartupId(id);
    await this.phaseRepository.delete(allPhases);

    const allTasks = await this.taskRepository.getAllByPhaseId(id);
    await this.taskRepository.delete(allTasks);

    return this.startupRepository.delete(id);
  }
}
