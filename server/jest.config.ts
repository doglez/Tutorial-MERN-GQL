import { Config } from "jest";

const jestConfig: Config = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.ts",
        "src/**/__tests__/**",
        "!**/index.{ts,js,tsx,jsx}",
        "!**/src/certificate/**",
        "!**/src/config/**",
        "!**/src/db/Seeder.ts",
        "!**/src/debugger/**",
    ],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageReporters: ["lcov", "text", "text-summary", "html"],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1",
    },
    preset: "ts-jest",
    roots: ["./src"],
    testEnvironment: "node",
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
    ],
    transformIgnorePatterns: ["\\\\node_modules\\\\", "\\.pnp\\.[^\\\\]+$"],
};

export default jestConfig;
