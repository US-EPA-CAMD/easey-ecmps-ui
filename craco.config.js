module.exports = {
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: [
            "./node_modules/@uswds",
            "./node_modules/@uswds/uswds/packages",
          ]
        }
      },
    },
  },
};