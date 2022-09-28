import { Module } from "@nestjs/common";
import { Repositories } from "./repository";
import { Resolvers } from "./resolvers";
import { Services } from "./services";

@Module({
  providers: [...Resolvers, ...Services, ...Repositories],
})
export class StartupModule {}
