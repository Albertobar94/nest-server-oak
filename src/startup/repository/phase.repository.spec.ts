import { Test, TestingModule } from "@nestjs/testing";
import { InMemoryData } from "./memory-data";
import { PhaseRepository } from "../repository/phase.repository";

describe("PhaseRepository", () => {
  let repository: PhaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhaseRepository, InMemoryData],
    }).compile();

    repository = module.get<PhaseRepository>(PhaseRepository);
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });
});
