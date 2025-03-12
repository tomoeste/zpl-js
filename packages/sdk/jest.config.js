/** @type {import("ts-jest").JestConfigWithTsJest} **/
const config = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  testMatch: ["**/__tests__/*.test.(ts|tsx)"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
export default config;
