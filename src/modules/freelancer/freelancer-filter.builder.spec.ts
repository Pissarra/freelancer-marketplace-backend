import { FreelancerFilterBuilder } from './freelancer-filter.builder';
import { SelectQueryBuilder } from 'typeorm';
import { Freelancer } from '../../common/entities/freelancer.entity';
import { FreelancerFilterDto } from './dtos/freelancer-filter.dto';

describe('FreelancerFilterBuilder', () => {
  let qb: jest.Mocked<SelectQueryBuilder<Freelancer>>;

  beforeEach(() => {
    qb = Object.create(SelectQueryBuilder.prototype);

    qb.andWhere = jest.fn().mockReturnThis();
    qb.innerJoin = jest.fn().mockReturnThis();
  });

  it('should apply location and timezone filters', () => {
    const filter: FreelancerFilterDto = {
      location: 'New York',
      timezone: 'UTC-5',
    };

    const builder = new FreelancerFilterBuilder(qb, filter);
    builder.applyFilters();

    expect(qb.andWhere).toHaveBeenCalledWith(
      'freelancer.location = :location',
      { location: 'New York' },
    );
    expect(qb.andWhere).toHaveBeenCalledWith(
      'freelancer.timezone = :timezone',
      { timezone: 'UTC-5' },
    );
  });

  it('should apply hourly rate and rating filters', () => {
    const filter: FreelancerFilterDto = {
      hourlyRateMin: 50,
      hourlyRateMax: 100,
      ratingMin: 4.5,
    };

    const builder = new FreelancerFilterBuilder(qb, filter);
    builder.applyFilters();

    expect(qb.andWhere).toHaveBeenCalledWith(
      'freelancer.hourlyRate >= :hourlyRateMin',
      { hourlyRateMin: 50 },
    );
    expect(qb.andWhere).toHaveBeenCalledWith(
      'freelancer.hourlyRate <= :hourlyRateMax',
      { hourlyRateMax: 100 },
    );
    expect(qb.andWhere).toHaveBeenCalledWith(
      'freelancer.rating >= :ratingMin',
      { ratingMin: 4.5 },
    );
  });

  it('should apply available and skills filters', () => {
    const filter: FreelancerFilterDto = {
      available: true,
      skills: ['NestJS', 'TypeScript'],
    };

    const builder = new FreelancerFilterBuilder(qb, filter);
    builder.applyFilters();

    expect(qb.andWhere).toHaveBeenCalledWith(
      'freelancer.available = :available',
      { available: true },
    );
    expect(qb.innerJoin).toHaveBeenCalledWith(
      'freelancer.skills',
      'skills_join',
      'skills_join.description IN (:...skills)',
      { skills: ['NestJS', 'TypeScript'] },
    );
  });

  it('should apply permissions filter', () => {
    const builder = new FreelancerFilterBuilder(qb);
    builder.applyPermissionsFilter(['ADMIN', 'MODERATOR']);

    expect(qb.innerJoin).toHaveBeenCalledWith(
      'freelancer.allowedPermissions',
      'allowedPermissions_join',
      'allowedPermissions_join.description IN (:...permissions)',
      { permissions: ['ADMIN', 'MODERATOR'] },
    );
  });

  it('should return the query builder on build()', () => {
    const builder = new FreelancerFilterBuilder(qb);
    const result = builder.build();
    expect(result).toBe(qb);
  });
});
