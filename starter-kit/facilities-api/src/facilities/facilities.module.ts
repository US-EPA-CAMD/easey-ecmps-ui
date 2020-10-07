import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';

@Module({
  // imports: [
  //   TypeOrmModule.forFeature([TaskRepository]),
  // ],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
})

export class FacilitiesModule {}
