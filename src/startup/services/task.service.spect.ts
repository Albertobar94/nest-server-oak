import { Test, TestingModule } from "@nestjs/testing";
import { Repositories } from "../repository";
import { TaskService } from "./task.service";

describe("TaskService", () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, ...Repositories],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
