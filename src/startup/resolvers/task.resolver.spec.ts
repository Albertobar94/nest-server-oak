import { Test, TestingModule } from "@nestjs/testing";
import { Services } from "../services";
import { Repositories } from "../repository";
import { TaskResolver } from "./task.resolver";

describe("TaskResolver", () => {
  let resolver: TaskResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskResolver, ...Services, ...Repositories],
    }).compile();

    resolver = module.get<TaskResolver>(TaskResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
