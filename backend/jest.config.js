/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  setupFiles: ["<rootDir>/tests/setup.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  roots: ["<rootDir>/tests", "<rootDir>/src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
