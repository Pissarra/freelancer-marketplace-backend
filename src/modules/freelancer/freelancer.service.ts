import { Injectable } from '@nestjs/common';
import { FreelancerDto } from './dtos/freelancer.dto';
import { FreelancerFilterDto } from './dtos/freelancer-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Freelancer } from '../../common/entities/freelancer.entity';
import { FreelancerFilterBuilder } from './freelancer-filter.builder';
import { Repository } from 'typeorm';

@Injectable()
export class FreelancerService {
  constructor(
    @InjectRepository(Freelancer)
    private readonly repo: Repository<Freelancer>,
  ) {}

  getAll(
    page: number,
    limit: number,
    filters?: FreelancerFilterDto,
  ): Promise<FreelancerDto[]> {
    const qb = this.repo.createQueryBuilder('freelancer');

    const permissions = []; // TODO

    const builder = new FreelancerFilterBuilder(qb, filters)
      .applyFilters()
      .applyPermissionsFilter(permissions);

    return builder
      .build()
      .leftJoinAndSelect('freelancer.skills', 'skills')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }
}
