import { Test, TestingModule } from "@nestjs/testing";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { Services } from "../services";
import { Repositories } from "../repository";
import { StartupResolver } from "./startup.resolver";

describe("StartupResolver", () => {
  let resolver: StartupResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [StartupResolver, ...Services, ...Repositories],
    }).compile();

    resolver = module.get<StartupResolver>(StartupResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
