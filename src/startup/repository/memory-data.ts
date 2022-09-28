import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

export interface IMemoryCollection {
  id: string;
  [key: string | symbol]: any;
}

export class Collection {
  private data: Record<string, IMemoryCollection> = {};

  async getAll<T extends IMemoryCollection>(): Promise<T[]> {
    const records = Object.entries(this.data).map(([key, values]) => {
      return {
        id: key,
        ...values,
      } as T;
    });
    if (!records.length) {
      return [];
    }

    return records;
  }

  async getByProperty<T>(
    property: string,
    value: string | number | boolean | symbol,
  ): Promise<T[]> {
    const records = Object.entries(this.data)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, values]) => {
        if (values[property] === value) {
          return true;
        }
        return false;
      })
      .map(([key, values]) => {
        return {
          id: key,
          ...values,
        } as T;
      });
    if (!records.length) {
      return [];
    }

    return records;
  }

  async getById<T>(id: string): Promise<T[]> {
    const record = this.data[id] as T;
    if (!record) {
      return [];
    }

    return [record];
  }

  async insert<T extends { id: string }>(values: T): Promise<T[]> {
    const id = values.id || randomUUID();
    const record = { ...values, id };

    this.data[id] = record;

    return [record];
  }

  async update<T extends IMemoryCollection>(
    id: string,
    values: Partial<T>,
  ): Promise<T[]> {
    const previousValues = this.data[id];
    const newRecord = { ...previousValues, ...values, id } as T;
    this.data[id] = newRecord;

    return [newRecord];
  }

  async delete(id: string): Promise<void> {
    delete this.data[id];
  }
}

@Injectable()
export class InMemoryData {
  public startup = new Collection();
  public phase = new Collection();
  public task = new Collection();
}
