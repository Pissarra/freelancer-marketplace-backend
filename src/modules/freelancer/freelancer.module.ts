import { Module } from '@nestjs/common';
import { FreelancerController } from './freelancer.controller';
import { FreelancerService } from './freelancer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Freelancer } from '../../common/entities/freelancer.entity';
import { Skill } from '../../common/entities/skill.entity';
import { Permission } from '../../common/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Freelancer, Skill, Permission])],
  controllers: [FreelancerController],
  providers: [FreelancerService],
})
export class FreelancerModule {}
