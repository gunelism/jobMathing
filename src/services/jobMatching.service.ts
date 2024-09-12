import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from '../entities/jobPosting.entity';
import { JobSeeker } from '../entities/jobSeeker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobMatchingService {
  constructor(
    @InjectRepository(JobSeeker)
    private readonly jobSeekerRepo: Repository<JobSeeker>,
    @InjectRepository(JobPosting)
    private readonly jobPostingRepo: Repository<JobPosting>,
  ) {}

  async match(jobSeekerId: number) {
    const jobSeeker = await this.jobSeekerRepo.findOne({
      where: { id: jobSeekerId },
      relations: ['skills'],
    });
    const jobPostings = await this.jobPostingRepo.find({
      relations: ['requiredSkills'],
    });

    return jobPostings
      .map((jobPosting) => {
        const requiredSkillIds = jobPosting.requiredSkills.map(
          (skill) => skill.id,
        );
        const seekerSkillIds = jobSeeker.skills.map((skill) => skill.id);

        const matchingSkillIds = requiredSkillIds.filter((id) =>
          seekerSkillIds.includes(id),
        );
        const matchPercentage =
          (matchingSkillIds.length / requiredSkillIds.length) * 100;

        if (matchPercentage >= 51) {
          return {
            jobPosting,
            matchingSkillIds,
            matchPercentage,
          };
        }

        return null;
      })
      .filter((match) => match !== null);
  }
}
