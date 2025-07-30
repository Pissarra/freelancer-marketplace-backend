import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Skill } from './skill.entity';
import { Permission } from './permission.entity';

@Entity()
export class Freelancer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  timezone: string;

  @Column({ type: 'float', name: 'hourly_rate' })
  hourlyRate: number;

  @Column('float')
  rating: number;

  @Column()
  available: boolean;

  @JoinTable({
    name: 'freelancer_skills_skill',
    joinColumn: {
      name: 'freelancer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill_id',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(() => Skill, { eager: true })
  skills: Skill[];

  @JoinTable({
    name: 'freelancer_permissions_permission',
    joinColumn: {
      name: 'freelancer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(() => Permission, { eager: true })
  allowedPermissions: Permission[];
}
