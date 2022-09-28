import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TaskEntity } from "../entities/task.entity";
import { TaskRepository } from "../repository/task.repository";
import { PhaseRepository } from "../repository/phase.repository";
import { StartupRepository } from "../repository/startup.repository";
import { EventEmitter2 } from "@nestjs/event-emitter";

type CreateTaskArgs = Omit<TaskEntity, "id" | "sequence" | "done">;

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly startupRepository: StartupRepository,
    private readonly phaseRepository: PhaseRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(data: CreateTaskArgs): Promise<TaskEntity[]> {
    const [startup] = await this.startupRepository.getById(data.startupId);
    if (!startup) {
      throw new BadRequestException("The startup must exist");
    }
    const [phase] = await this.phaseRepository.getById(data.phaseId);
    if (!phase) {
      throw new BadRequestException("The phase must exist");
    }

    const tasks = await this.taskRepository.getAllByPhaseId(data.phaseId);
    for (const task of tasks) {
      if (task.title === data.title) {
        throw new BadRequestException("The title already exists for the phase");
      }
    }
    const sequence = tasks.length;
    const taskEntity = TaskEntity.create({ ...data, sequence });

    return this.taskRepository.create(taskEntity);
  }

  async getById(id: string): Promise<TaskEntity[]> {
    return this.taskRepository.getById(id);
  }

  async getAllByPhaseId(id: string): Promise<TaskEntity[]> {
    return this.taskRepository.getAllByPhaseId(id);
  }

  async getAll(): Promise<TaskEntity[]> {
    return this.taskRepository.getAll();
  }

  async delete(id: string): Promise<void> {
    const [task] = await this.taskRepository.getById(id);
    if (!task) {
      throw new NotFoundException(
        "Please check the task id as it may be incorrect",
      );
    }

    const nextTaskSequence = task.sequence + 1;
    const [nextTask] = await this.phaseRepository.getBySequence(
      nextTaskSequence,
    );
    if (nextTask && typeof nextTask.id === "string") {
      throw new ConflictException(
        "Cannot remove a task in the middle of the sequence, please delete last first",
      );
    }

    const [phase] = await this.phaseRepository.getById(task.phaseId);
    if (phase && phase.done === true) {
      throw new ConflictException(
        "Cannot remove a task in a phase marked as done",
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

    return this.taskRepository.delete(id);
  }

  async setTaskDone(id: string): Promise<TaskEntity[]> {
    const [task] = await this.taskRepository.getById(id);
    if (!task) {
      throw new NotFoundException(
        "Please check the task id as it may be incorrect",
      );
    }

    const [phase] = await this.phaseRepository.getById(task.phaseId);
    const previousPhaseSequence = phase.sequence - 1;
    const [previousPhase] = await this.phaseRepository.getBySequence(
      previousPhaseSequence,
    );
    if (previousPhase && previousPhase.done !== true) {
      throw new ConflictException("Previous phase must be marked as done");
    }

    const updatedTaskEntity = TaskEntity.setDone(task);
    const updatedTask = await this.taskRepository.update(
      task.id,
      updatedTaskEntity,
    );

    const allTasks = await this.taskRepository.getAllByPhaseId(phase.id);
    const allDoneTasksLength = allTasks.filter(
      (task) => task.done === true,
    ).length;
    if (allTasks.length === allDoneTasksLength) {
      this.eventEmitter.emit("phase.done", phase);
    }

    return updatedTask;
  }

  async setTaskUndone(id: string): Promise<TaskEntity[]> {
    const [task] = await this.taskRepository.getById(id);
    if (!task) {
      throw new NotFoundException(
        "Please check the task id as it may be incorrect",
      );
    }
    const [phase] = await this.phaseRepository.getById(task.phaseId);
    if (phase.done === true) {
      throw new ConflictException(
        "Cannot set undone a task when the phase is finished",
      );
    }

    const updatedTask = TaskEntity.setUndone(task);
    return this.taskRepository.update(task.id, updatedTask);
  }
}
