import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { FreelancerService } from './freelancer.service';
import { FreelancerFilterDto } from './dtos/freelancer-filter.dto';

@Controller('freelancers')
export class FreelancerController {
  constructor(private readonly service: FreelancerService) {}

  /**
   * Use POST instead of GET to avoid issues with large datasets.
   * And HTTP 200 to indicate successful retrieval. Not 201 for creation (default behavior).
   */
  @Get()
  // @Post()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Body() filters?: FreelancerFilterDto,
  ) {
    return this.service.getAll(page, limit, filters);
  }
}
