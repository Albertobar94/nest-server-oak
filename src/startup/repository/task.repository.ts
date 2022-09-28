import { Injectable } from "@nestjs/common";
import { InMemoryData } from "./memory-data";
import { IRepository } from "./base.repository";
import { TaskEntity } from "../entities/task.entity";

@Injectable()
export class TaskRepository implements IRepository<TaskEntity> {
  constructor(private inMemoryDB: InMemoryData) {}

  async create(task: TaskEntity): Promise<TaskEntity[]> {
    return this.inMemoryDB.task.insert(task);
  }

  async getById(id: TaskEntity["id"]): Promise<TaskEntity[]> {
    return this.inMemoryDB.task.getById(id);
  }

  async getByTitle(title: TaskEntity["title"]): Promise<TaskEntity[]> {
    return this.inMemoryDB.startup.getByProperty("title", title);
  }

  async getAllByStartupId(id: string): Promise<TaskEntity[]> {
    return this.inMemoryDB.task.getByProperty("startupId", id);
  }

  async getAllByPhaseId(id: string): Promise<TaskEntity[]> {
    return this.inMemoryDB.task.getByProperty("phaseId", id);
  }

  async getAll(): Promise<TaskEntity[]> {
    return this.inMemoryDB.task.getAll();
  }

  async update(
    id: TaskEntity["id"],
    task: Partial<TaskEntity>,
  ): Promise<TaskEntity[]> {
    return this.inMemoryDB.task.update(id, task);
  }

  async delete(data: TaskEntity["id"] | TaskEntity[]): Promise<void> {
    if (Array.isArray(data)) {
      await Promise.all(
        data.map((data) => this.inMemoryDB.task.delete(data.id)),
      );
      return;
    } else {
      return this.inMemoryDB.task.delete(data);
    }
  }
}
