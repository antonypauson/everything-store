import request from "supertest";
import { AppDataSource } from "../../src/data-source";
import app from "../../src/app";

describe("Product E2E tests", () => {
  let server: any;

  //start the server
  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await AppDataSource.initialize();
    server = app.listen(3001);
  });

  //close the server
  afterAll(async () => {
    await AppDataSource.destroy();
    server.close();
  });

  it("should return 200 for the root path", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toEqual(200);
  });
});
