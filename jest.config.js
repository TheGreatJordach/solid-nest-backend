module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  coverageReporters: ["text", "lcov"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "../coverage",
        outputName: "junit.xml",
      },
    ],
  ],
};
