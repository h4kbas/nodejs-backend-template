import request from "supertest";
import dotenv from "dotenv";

import app from "../../app";
import dataSource from "../../lib/DataSource";

dotenv.config({
  path: ".env_testing",
});

beforeAll(async () => {
  // Initialize database connection
  await dataSource.initialize();
});

afterAll(async () => {
  // Close database connection
  await dataSource.destroy();
});

describe("GET / - a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(app).get("/users");
    expect(result.text).toEqual('"hello"');
    expect(result.statusCode).toEqual(200);
  });
});
