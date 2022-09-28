import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PhaseEntity } from "../entities/phase.entity";
import { TaskRepository } from "../repository/task.repository";
import { PhaseRepository } from "../repository/phase.repository";
import { StartupRepository } from "../repository/startup.repository";

type CreatePhaseArgs = Omit<PhaseEntity, "id" | "sequence" | "done">;

@Injectable()
export class PhaseService {
  constructor(
    private readonly phaseRepository: PhaseRepository,
    private readonly startupRepository: StartupRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  async create(data: CreatePhaseArgs): Promise<PhaseEntity[]> {
    const [startup] = await this.startupRepository.getById(data.startupId);
    if (!startup) {
      throw new BadRequestException("The startup must exist");
    }

    const exists = await this.phaseRepository.getByTitle(data.title);
    if (exists.length > 0) {
      return exists;
    }

    const phases = await this.phaseRepository.getAll();
    const sequence = phases.length;
    const phaseEntity = PhaseEntity.create({ ...data, sequence });

    return this.phaseRepository.create(phaseEntity);
  }

  async getById(id: string): Promise<PhaseEntity[]> {
    return this.phaseRepository.getById(id);
  }

  async getAllByStartupId(id: string): Promise<PhaseEntity[]> {
    return this.phaseRepository.getAllByStartupId(id);
  }

  async delete(id: string): Promise<void> {
    const [phase] = await this.phaseRepository.getById(id);
    if (!phase) {
      throw new NotFoundException(
        "Please check the task id as it may be incorrect",
      );
    }

    const nextPhaseSequence = phase.sequence + 1;
    const [nextPhase] = await this.phaseRepository.getBySequence(
      nextPhaseSequence,
    );
    if (nextPhase && typeof nextPhase.id === "string") {
      throw new ConflictException(
        "Cannot remove a phase in the middle of the sequence, please delete last first",
      );
    }

    const allTasks = await this.taskRepository.getAllByPhaseId(id);
    await this.taskRepository.delete(allTasks);

    return this.phaseRepository.delete(id);
  }

  async setPhaseDone(id: string): Promise<PhaseEntity[]> {
    const [phase] = await this.phaseRepository.getById(id);
    if (!phase) {
      throw new NotFoundException(
        "Please check the task id as it may be incorrect",
      );
    }

    const previousPhaseSequence = phase.sequence - 1;
    const [previousPhase] = await this.phaseRepository.getBySequence(
      previousPhaseSequence,
    );
    if (previousPhase && previousPhase.done !== true) {
      throw new ConflictException("Previous phase must be marked as done");
    }

    const allTasks = await this.taskRepository.getAllByPhaseId(id);
    const allDoneTasksLength = allTasks.filter(
      (task) => task.done === true,
    ).length;
    if (allTasks.length !== allDoneTasksLength) {
      throw new ConflictException(
        "All tasks must be marked as done before finishing a phase",
      );
    }

    const updatedPhase = PhaseEntity.setDone(phase);
    return this.phaseRepository.update(phase.id, updatedPhase);
  }

  async setPhaseUndone(id: string): Promise<PhaseEntity[]> {
    const [phase] = await this.phaseRepository.getById(id);
    if (!phase) {
      throw new NotFoundException(
        "Please check the task id as it may be incorrect",
      );
    }

    const nextPhaseSequence = phase.sequence + 1;
    const [nextPhase] = await this.phaseRepository.getBySequence(
      nextPhaseSequence,
    );
    if (nextPhase && nextPhase.done === true) {
      throw new ConflictException(
        "Next phase must not be marked as done to mark current phase as done",
      );
    }

    const updatedPhase = PhaseEntity.setUndone(phase);
    return this.phaseRepository.update(phase.id, updatedPhase);
  }
}
