/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  coveragePathIgnorePatterns: [
    "node_modules",
    "index.ts",
    ".d.ts",
    ".module.css",
    "<rootDir>/src/App.tsx",
    ".test.ts"
  ],
  coverageThreshold: {
    "global": {
      "branches": 90,
      "functions": 90,
      "lines": 90,
      "statements": 90
    }
  },
};