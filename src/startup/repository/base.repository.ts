export interface IRepository<
  T extends { id: string; [key: string | symbol]: any },
> {
  getById(id: T["id"]): Promise<T[]>;
  getAll(): Promise<T[]>;
  create(data: T): Promise<T | T[]>;
  update(id: T["id"], data: T): Promise<T[]>;
  delete(id: T["id"]): Promise<void>;
}
