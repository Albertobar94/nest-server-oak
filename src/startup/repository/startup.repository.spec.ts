import { Test, TestingModule } from "@nestjs/testing";
import { InMemoryData } from "./memory-data";
import { StartupRepository } from "../repository/startup.repository";

describe("StartupRepository", () => {
  let repository: StartupRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StartupRepository, InMemoryData],
    }).compile();

    repository = module.get<StartupRepository>(StartupRepository);
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });
});
