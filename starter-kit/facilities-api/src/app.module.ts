import { Module } from '@nestjs/common';
import { FacilitiesModule } from './facilities/facilities.module';

@Module({
  imports: [FacilitiesModule],
})
export class AppModule {}
