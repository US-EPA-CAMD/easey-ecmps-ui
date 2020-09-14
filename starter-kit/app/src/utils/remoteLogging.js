//This module sends browser logs to a remote logging service

import log from "loglevel";
//import remote from 'loglevel-plugin-remote';

const customJSON = (log) => ({
  msg: log.message,
  level: log.level.label,
  stacktrace: log.stacktrace,
});

const defaults = {
  url: "/logger",
  method: "POST",
  headers: {},
  token: "",
  onUnauthorized: (failedToken) => {},
  timeout: 0,
  interval: 1000,
  level: "trace",
  backoff: {
    multiplier: 2,
    jitter: 0.1,
    limit: 30000,
  },
  capacity: 500,
  stacktrace: {
    levels: ["trace", "warn", "error"],
    depth: 3,
    excess: 0,
  },
  timestamp: () => new Date().toISOString(),
  format: customJSON,
};

//remote.apply(log, { defaults });

log.enableAll();
