import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Skill } from './skill.entity';

@Entity()
export class JobSeeker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];
}
