module.exports = {
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: [
            "./node_modules/@uswds",
            "./node_modules/@uswds/uswds/packages",
          ],
        },
      },
    },
  },
  webpack: {
    alias: {
      url: require.resolve("url"),
    },
  },
  jest: {
    configure: (jestConfig) => {
      jestConfig.transformIgnorePatterns = ["node_modules/(?!(axios)/)"];
      jestConfig.collectCoverageFrom = [
        "src/**/*.{js,jsx,ts,tsx}",
        "!node_modules/",
        "!src/config.js",
        "!src/serviceWorker.js",
        "!src/index.js",
        "!src/App.js",
        "!src/store/configureStore.dev.js",
        "!src/store/actions/actionTypes.js",
        "!src/store/reducers/index.js",
        "!src/store/reducers/initialState.js",
        "!src/utils/api/axiosSetup.js",
        "!src/utils/api/setupTests.js",
      ];
      jestConfig.moduleNameMapper = {
        "\\.(css|scss)$": "<rootDir>/src/mocks/styleMock.js"
      };
      return jestConfig;
    },
  },
};
