import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from '../entities/jobPosting.entity';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CreateJobPostingDto } from '../dto/createJobPosting.dto';
import { Skill } from 'src/entities/skill.entity';

@Injectable()
export class JobPostingService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobPostingRepo: Repository<JobPosting>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(Skill) private readonly skillRepo: Repository<Skill>,
  ) {}

  async create(createJobPostingDto: CreateJobPostingDto) {
    const company = await this.companyRepo.findOne({
      where: { id: createJobPostingDto.companyId },
    });
    if (!company) {
      throw new Error('Company not found');
    }

    const skills = await this.skillRepo.findByIds(
      createJobPostingDto.requiredSkills,
    );

    const jobPosting = this.jobPostingRepo.create({
      title: createJobPostingDto.title,
      company,
      requiredSkills: skills,
    });

    return this.jobPostingRepo.save(jobPosting);
  }

  findAll() {
    return this.jobPostingRepo.find({
      relations: ['company', 'requiredSkills'],
    });
  }
}
