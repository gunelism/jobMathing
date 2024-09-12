import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobSeekerDto } from '../dto/createJobSeeker.dto';
import { JobSeeker } from '../entities/jobSeeker.entity';
import { In, Repository } from 'typeorm';
import { Skill } from '../entities/skill.entity';

@Injectable()
export class JobSeekersService {
  constructor(
    @InjectRepository(JobSeeker)
    private readonly jobSeekerRepo: Repository<JobSeeker>,
    @InjectRepository(Skill) private readonly skillRepo: Repository<Skill>,
  ) {}

  async create(createJobSeekerDto: CreateJobSeekerDto) {
    const skills = await this.skillRepo.findBy({
      id: In(createJobSeekerDto.skills),
    });
    const jobSeeker = this.jobSeekerRepo.create({
      name: createJobSeekerDto.name,
      skills,
    });
    return this.jobSeekerRepo.save(jobSeeker);
  }

  findAll() {
    return this.jobSeekerRepo.find({ relations: ['skills'] });
  }
}
