import { Module } from "@nestjs/common";
import { Services } from "./services";
import { Resolvers } from "./resolvers";
import { Listeners } from "./listeners";
import { Repositories } from "./repository";

@Module({
  providers: [...Resolvers, ...Services, ...Listeners, ...Repositories],
})
export class StartupModule {}
