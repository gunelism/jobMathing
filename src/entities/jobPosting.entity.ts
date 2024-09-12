import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Company } from './company.entity';
import { Skill } from './skill.entity';

@Entity()
export class JobPosting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;

  @ManyToMany(() => Skill)
  @JoinTable()
  requiredSkills: Skill[];
}
