import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { StartupModule } from "./startup/startup.module";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    EventEmitterModule.forRoot(),
    StartupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
