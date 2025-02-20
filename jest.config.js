export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], 
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/mocks/styleMock.js',
    'react-markdown': '<rootDir>/src/mocks/styleMock.js',
    'remark-gfm': '<rootDir>/src/mocks/styleMock.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|other-module)/)",
  ],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/App.js',
    '!src/config.js',
    '!src/serviceWorker.js',
    '!src/store/configureStore.dev.js',
    '!src/store/actions/actionTypes.js',
    '!src/store/reducers/index.js',
    '!src/store/reducers/initialState.js',
    '!src/utils/api/axiosSetup.js',
    '!src/utils/api/setupTests.js',
  ],
  coverageReporters: ['html', 'text', 'clover', 'json', 'lcov'],
};