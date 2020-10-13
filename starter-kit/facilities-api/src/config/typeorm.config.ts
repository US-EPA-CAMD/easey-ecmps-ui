import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: pgHost,
  port: pgPort,
  username: pgUser,
  password: pgPwd,
  database: pgDb,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};
