import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    "\\.[jt]sx?$": "ts-jest",
  },
  "globals": {
    "ts-jest": {
      "useESM": true
    }
  },
  moduleNameMapper: {
    "(.+)\\.js": "$1"
  },
  extensionsToTreatAsEsm: [".ts"]
}

export default jestConfig