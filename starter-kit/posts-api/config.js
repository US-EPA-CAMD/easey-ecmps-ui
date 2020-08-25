let pgHost = process.env.PG_HOST || 'localhost';
let pgPort = +process.env.PG_PORT || 5432;
let pgUser = process.env.PG_USER;
let pgPwd = process.env.PG_PWD;
let pgDb = process.env.PG_DB;

if (process.env.VCAP_SERVICES) {
  const vcapSvc = JSON.parse(process.env.VCAP_SERVICES);
  const vcapSvcCreds = vcapSvc['aws-rds'][0].credentials;
  
  pgHost = vcapSvcCreds.host;
  pgPort = +vcapSvcCreds.port;
  pgUser = vcapSvcCreds.username;
  pgPwd = vcapSvcCreds.password;
  pgDb = vcapSvcCreds.name;
}

module.exports = {
  PORT: process.env.PORT || 4000,
  PG_HOST: pgHost,
  PG_PORT: pgPort,
  PG_USER: pgUser,
  PG_PWD: pgPwd,
  PG_DB: pgDb
}