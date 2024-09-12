import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateJobPostingDto } from '../dto/createJobPosting.dto';
import { JobPostingService } from '../services/jobPosting.service';

@Controller('job-postings')
export class JobPostingController {
  constructor(private readonly jobPostingsService: JobPostingService) {}

  @Post()
  createJobPosting(@Body() createJobPostingDto: CreateJobPostingDto) {
    return this.jobPostingsService.create(createJobPostingDto);
  }

  @Get()
  getAllJobPostings() {
    return this.jobPostingsService.findAll();
  }
}
