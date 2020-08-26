const config = {
  services: {
    posts: {
      uri: process.env.REACT_APP_POSTS_API,
    },
    tasks: {
      uri: process.env.REACT_APP_TASKS_API,
    },
  },
}

module.exports = config;