import { Injectable } from "@nestjs/common";
import { InMemoryData } from "./memory-data";
import { IRepository } from "./base.repository";
import { PhaseEntity } from "../entities/phase.entity";

@Injectable()
export class PhaseRepository implements IRepository<PhaseEntity> {
  constructor(private inMemoryDB: InMemoryData) {}

  async create(phase: PhaseEntity): Promise<PhaseEntity[]> {
    return this.inMemoryDB.phase.insert(phase);
  }

  async getAll(): Promise<PhaseEntity[]> {
    return this.inMemoryDB.phase.getAll();
  }

  async getById(id: PhaseEntity["id"]): Promise<PhaseEntity[]> {
    return this.inMemoryDB.phase.getById(id);
  }

  async getByTitle(title: PhaseEntity["title"]): Promise<PhaseEntity[]> {
    return this.inMemoryDB.startup.getByProperty("title", title);
  }

  async getAllByStartupId(id: string): Promise<PhaseEntity[]> {
    return this.inMemoryDB.phase.getByProperty("startupId", id);
  }

  async getBySequence(sequence: number): Promise<PhaseEntity[]> {
    const result = this.inMemoryDB.phase.getByProperty<PhaseEntity>(
      "sequence",
      sequence,
    );

    return result;
  }

  async update(
    id: PhaseEntity["id"],
    phase: Partial<PhaseEntity>,
  ): Promise<PhaseEntity[]> {
    return this.inMemoryDB.phase.update(id, phase);
  }

  async delete(data: PhaseEntity["id"] | PhaseEntity[]): Promise<void> {
    if (Array.isArray(data)) {
      await Promise.all(
        data.map((data) => this.inMemoryDB.phase.delete(data.id)),
      );
      return;
    } else {
      return this.inMemoryDB.task.delete(data);
    }
  }
}
