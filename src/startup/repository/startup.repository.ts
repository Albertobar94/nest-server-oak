import { Injectable } from "@nestjs/common";
import { InMemoryData } from "./memory-data";
import { IRepository } from "./base.repository";
import { StartupEntity } from "../entities/startup.entity";

@Injectable()
export class StartupRepository implements IRepository<StartupEntity> {
  constructor(private inMemoryDB: InMemoryData) {}

  async create(startup: StartupEntity): Promise<StartupEntity[]> {
    return this.inMemoryDB.startup.insert(startup);
  }

  async getById(id: StartupEntity["id"]): Promise<StartupEntity[]> {
    return this.inMemoryDB.startup.getById(id);
  }

  async getByName(name: StartupEntity["name"]): Promise<StartupEntity[]> {
    return this.inMemoryDB.startup.getByProperty("name", name);
  }

  async getAll(): Promise<StartupEntity[]> {
    return this.inMemoryDB.startup.getAll();
  }

  async update(
    id: StartupEntity["id"],
    startup: Partial<StartupEntity>,
  ): Promise<StartupEntity[]> {
    return this.inMemoryDB.startup.update(id, startup);
  }

  async delete(id: StartupEntity["id"]): Promise<void> {
    return this.inMemoryDB.startup.delete(id);
  }
}
