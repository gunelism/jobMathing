import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSkillDto } from 'src/dto/createSkill.dto';
import { Skill } from '../entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private readonly skillRepo: Repository<Skill>,
  ) {}

  create(createSkillDto: CreateSkillDto) {
    const skill = this.skillRepo.create(createSkillDto);
    return this.skillRepo.save(skill);
  }

  findAll() {
    return this.skillRepo.find();
  }
}
