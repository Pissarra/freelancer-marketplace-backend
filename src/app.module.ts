import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FreelancerModule } from './modules/freelancer/freelancer.module';

@Module({
  imports: [FreelancerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
