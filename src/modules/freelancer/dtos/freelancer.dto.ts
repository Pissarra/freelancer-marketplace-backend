import { Skill } from '../../../common/entities/skill.entity';

export class FreelancerDto {
  readonly id: number;
  readonly name: string;
  readonly location: string;
  readonly timezone: string;
  readonly hourlyRate: number;
  readonly rating: number;
  readonly available: boolean;
  readonly skills?: Skill[];
}
