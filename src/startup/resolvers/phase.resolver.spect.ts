import { Test, TestingModule } from "@nestjs/testing";
import { Services } from "../services";
import { Repositories } from "../repository";
import { PhaseResolver } from "./phase.resolver";

describe("PhaseResolver", () => {
  let resolver: PhaseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhaseResolver, ...Services, ...Repositories],
    }).compile();

    resolver = module.get<PhaseResolver>(PhaseResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
