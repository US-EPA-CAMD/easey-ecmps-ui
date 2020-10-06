import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilitiesModule } from './facilities/facilities.module';
//import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //TypeOrmModule.forRoot(typeOrmConfig),    
    FacilitiesModule
  ],
})
export class AppModule {}
