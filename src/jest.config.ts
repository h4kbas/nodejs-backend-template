import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  automock: true,
  testMatch: ["**/__tests__/**/*.test.js"],
  moduleFileExtensions: ["ts"],
};
export default config;
