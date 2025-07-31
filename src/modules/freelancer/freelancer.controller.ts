import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { FreelancerService } from './freelancer.service';
import { FreelancerFilterDto } from './dtos/freelancer-filter.dto';
import { ActiveUser } from '../../auth/decorator/active-user.decorator';
import { JwtUserData } from '../../auth/interfaces/user.interface';

@Controller('api/freelancers')
export class FreelancerController {
  constructor(private readonly service: FreelancerService) {}

  /**
   * Use POST instead of GET to avoid issues with large datasets.
   * And HTTP 200 to indicate successful retrieval. Not 201 for creation (default behavior).
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @ActiveUser() user: JwtUserData,
    @Body() filters?: FreelancerFilterDto,
  ) {
    return this.service.getAll(page, limit, user, filters);
  }
}
