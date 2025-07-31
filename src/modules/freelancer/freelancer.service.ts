import { Injectable } from '@nestjs/common';
import { FreelancerDto } from './dtos/freelancer.dto';
import { FreelancerFilterDto } from './dtos/freelancer-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Freelancer } from '../../common/entities/freelancer.entity';
import { FreelancerFilterBuilder } from './freelancer-filter.builder';
import { Repository } from 'typeorm';
import { JwtUserData } from '../../auth/interfaces/user.interface';

@Injectable()
export class FreelancerService {
  constructor(
    @InjectRepository(Freelancer)
    private readonly repo: Repository<Freelancer>,
  ) {}

  getAll(
    page: number,
    limit: number,
    user: JwtUserData, // Assuming ActiveUserData is defined in your auth module
    filters?: FreelancerFilterDto,
  ): Promise<FreelancerDto[]> {
    const qb = this.repo.createQueryBuilder('freelancer');

    const builder = new FreelancerFilterBuilder(qb, filters)
      .applyFilters()
      .applyPermissionsFilter( user.permissions);

    return builder
      .build()
      .leftJoinAndSelect('freelancer.skills', 'skills')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }
}
