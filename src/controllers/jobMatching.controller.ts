import { Controller, Get, Param } from '@nestjs/common';
import { JobMatchingService } from '../services/jobMatching.service';

@Controller('job-matching')
export class JobMatchingController {
  constructor(private readonly jobMatchingService: JobMatchingService) {}

  @Get('/:jobSeekerId')
  matchJobs(@Param('jobSeekerId') jobSeekerId: number) {
    return this.jobMatchingService.match(jobSeekerId);
  }
}
