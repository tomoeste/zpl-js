/** @type {import("ts-jest").JestConfigWithTsJest} **/
const config = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  testMatch: ["**/__tests__/*.test.(ts|tsx)"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
export default config;
