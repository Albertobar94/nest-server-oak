import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { StartupModule } from "./startup/startup.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    StartupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
