import { Test, TestingModule } from "@nestjs/testing";
import { InMemoryData } from "./memory-data";
import { TaskRepository } from "../repository/task.repository";

describe("TaskRepository", () => {
  let repository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskRepository, InMemoryData],
    }).compile();

    repository = module.get<TaskRepository>(TaskRepository);
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });
});
