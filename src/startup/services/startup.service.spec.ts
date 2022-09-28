import { Test, TestingModule } from "@nestjs/testing";
import { Repositories } from "../repository";
import { StartupService } from "./startup.service";
import { StartupRepository } from "../repository/startup.repository";

describe("StartupService", () => {
  let service: StartupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StartupService, StartupRepository, ...Repositories],
    }).compile();

    service = module.get<StartupService>(StartupService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
