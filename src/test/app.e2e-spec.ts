import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("POST /graphql", () => {
    return request(app.getHttpServer())
      .post("/graphql")
      .send({ query: "{ startups { id name } }" })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.startups).toEqual([]);
      });
  });
});
