/**
 * Jest Configuration File
 * ------------------------
 * This configuration file sets up Jest for testing TypeScript code.
 * It uses the ts-jest preset and defines common settings to ensure smooth
 * integration with TypeScript projects.
 */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.test.ts"],
};
