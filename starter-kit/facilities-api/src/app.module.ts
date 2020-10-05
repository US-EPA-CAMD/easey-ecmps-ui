import { Module } from '@nestjs/common';
import { FacilitiesModule } from './facilities/facilities.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [FacilitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
