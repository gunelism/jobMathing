import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPosting } from '../entities/jobPosting.entity';
import { JobSeeker } from '../entities/jobSeeker.entity';

@Injectable()
export class CompanyMatchingService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobPostingRepo: Repository<JobPosting>,
    @InjectRepository(JobSeeker)
    private readonly jobSeekerRepo: Repository<JobSeeker>,
  ) {}

  async findCandidates(companyId: number) {
    const jobPostings = await this.jobPostingRepo.find({
      where: { company: { id: companyId } },
      relations: ['requiredSkills'],
    });
    const jobSeekers = await this.jobSeekerRepo.find({ relations: ['skills'] });

    return jobPostings.map((jobPosting) => {
      const matchedCandidates = jobSeekers.filter((seeker) => {
        const requiredSkillIds = jobPosting.requiredSkills.map(
          (skill) => skill.id,
        );
        const seekerSkillIds = seeker.skills.map((skill) => skill.id);

        const matchingSkillIds = requiredSkillIds.filter((id) =>
          seekerSkillIds.includes(id),
        );
        const matchPercentage =
          (matchingSkillIds.length / requiredSkillIds.length) * 100;

        return matchPercentage >= 51;
      });

      return {
        jobPosting,
        matchedCandidates,
      };
    });
  }
}
