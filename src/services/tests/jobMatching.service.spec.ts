import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobMatchingService } from '../jobMatching.service';
import { JobPosting } from '../../entities/jobPosting.entity';
import { JobSeeker } from '../../entities/jobSeeker.entity';

describe('JobMatchingService', () => {
  let service: JobMatchingService;
  let jobSeekerRepo: Repository<JobSeeker>;
  let jobPostingRepo: Repository<JobPosting>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobMatchingService,
        {
          provide: getRepositoryToken(JobSeeker),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(JobPosting),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<JobMatchingService>(JobMatchingService);
    jobSeekerRepo = module.get<Repository<JobSeeker>>(
      getRepositoryToken(JobSeeker),
    );
    jobPostingRepo = module.get<Repository<JobPosting>>(
      getRepositoryToken(JobPosting),
    );
  });

  it('should match job postings based on job seeker skills', async () => {
    const jobSeeker = {
      id: 'seeker1',
      skills: [{ id: 'skill1' }, { id: 'skill2' }],
    } as JobSeeker;

    const jobPostings = [
      {
        id: 'job1',
        title: 'Job 1',
        requiredSkills: [{ id: 'skill1' }, { id: 'skill2' }, { id: 'skill3' }],
      },
      {
        id: 'job2',
        title: 'Job 2',
        requiredSkills: [{ id: 'skill3' }, { id: 'skill4' }],
      },
    ] as JobPosting[];

    jest.spyOn(jobSeekerRepo, 'findOne').mockResolvedValue(jobSeeker);
    jest.spyOn(jobPostingRepo, 'find').mockResolvedValue(jobPostings);

    const result = await service.match('seeker1');

    expect(result).toEqual([
      {
        jobPosting: {
          id: 'job1',
          title: 'Job 1',
        },
        matchingSkillIds: ['skill1', 'skill2'],
        matchPercentage: 66.66666666666666,
      },
    ]);
  });

  it('should throw an error if job seeker not found', async () => {
    jest.spyOn(jobSeekerRepo, 'findOne').mockResolvedValue(null);

    await expect(service.match('seeker1')).rejects.toThrow(
      'Job Seeker not found',
    );
  });

  it('should return an empty array if no job postings match', async () => {
    const jobSeeker = {
      id: 'seeker1',
      skills: [{ id: 'skill1' }],
    } as JobSeeker;

    const jobPostings = [
      {
        id: 'job1',
        title: 'Job 1',
        requiredSkills: [{ id: 'skill2' }, { id: 'skill3' }],
      },
    ] as JobPosting[];

    jest.spyOn(jobSeekerRepo, 'findOne').mockResolvedValue(jobSeeker);
    jest.spyOn(jobPostingRepo, 'find').mockResolvedValue(jobPostings);

    const result = await service.match('seeker1');

    expect(result).toEqual([]);
  });
});
