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

  private calculateMatchPercentage = (
    requiredSkillIds: Set<string>,
    seekerSkillIds: Set<string>,
  ): number => {
    const matchingSkillIds = [...requiredSkillIds].filter((skillId) =>
      seekerSkillIds.has(skillId),
    );
    return (matchingSkillIds.length / requiredSkillIds.size) * 100;
  };

  private processJobPosting(jobPosting: JobPosting, jobSeekers: JobSeeker[]) {
    const requiredSkillIds = new Set(
      jobPosting.requiredSkills.map((skill) => skill.id),
    );

    const matchedCandidates = jobSeekers
      .map((seeker) => {
        const seekerSkillIds = new Set(seeker.skills.map((skill) => skill.id));
        const matchPercentage = this.calculateMatchPercentage(
          requiredSkillIds,
          seekerSkillIds,
        );
        return matchPercentage >= 51
          ? { id: seeker.id, name: seeker.name }
          : null;
      })
      .filter((candidate) => candidate !== null);

    return {
      jobPosting: {
        id: jobPosting.id,
        title: jobPosting.title,
        requiredSkillIds: jobPosting.requiredSkills,
      },
      matchedCandidates,
    };
  }

  async findCandidates(companyId: string) {
    const jobPostings = await this.jobPostingRepo.find({
      where: { company: { id: companyId } },
      relations: ['requiredSkills'],
    });

    const jobSeekers = await this.jobSeekerRepo.find({ relations: ['skills'] });

    return jobPostings.map((jobPosting) =>
      this.processJobPosting(jobPosting, jobSeekers),
    );
  }
}
