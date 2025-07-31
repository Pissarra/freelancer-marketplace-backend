import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class FreelancerFilterDto {
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  hourlyRateMin?: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  hourlyRateMax?: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  ratingMin?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  availableOnly?: boolean;

  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  skills?: string[];
}
