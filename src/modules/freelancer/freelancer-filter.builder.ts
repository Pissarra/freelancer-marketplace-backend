import { SelectQueryBuilder } from 'typeorm';
import { Freelancer } from '../../common/entities/freelancer.entity';
import { FreelancerFilterDto } from './dtos/freelancer-filter.dto';

export class FreelancerFilterBuilder {
  constructor(
    private qb: SelectQueryBuilder<Freelancer>,
    private filter?: FreelancerFilterDto,
  ) {}

  applyFilters(): this {
    const {
      location,
      timezone,
      hourlyRateMin,
      hourlyRateMax,
      ratingMin,
      availableOnly,
      skills,
    } = this.filter || {};

    if (location) {
      this.qb.andWhere('freelancer.location = :location', { location });
    }
    if (timezone) {
      this.qb.andWhere('freelancer.timezone = :timezone', { timezone });
    }
    if (hourlyRateMin !== undefined) {
      this.qb.andWhere('freelancer.hourlyRate >= :hourlyRateMin', {
        hourlyRateMin,
      });
    }
    if (hourlyRateMax !== undefined) {
      this.qb.andWhere('freelancer.hourlyRate <= :hourlyRateMax', {
        hourlyRateMax,
      });
    }
    if (ratingMin !== undefined) {
      this.qb.andWhere('freelancer.rating >= :ratingMin', { ratingMin });
    }
    if (availableOnly) {
      this.qb.andWhere('freelancer.available is true');
    }
    if (skills && skills.length) {
      this.qb.innerJoin(
        'freelancer.skills',
        'skills_join',
        '(:...skills) IN (skills_join.description)',
        { skills },
      );
    }

    return this;
  }

  applyPermissionsFilter(permissions?: string[]): this {
    console.info('Applying permissions filter:', permissions);
    if (permissions && permissions.length) {
      this.qb.innerJoin(
        'freelancer.allowedPermissions',
        'allowedPermissions_join',
        'allowedPermissions_join.description IN (:...permissions)',
        { permissions },
      );
    }

    return this;
  }

  build() {
    return this.qb;
  }
}
