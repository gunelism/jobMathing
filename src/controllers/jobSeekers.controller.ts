import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateJobSeekerDto } from '../dto/createJobSeeker.dto';
import { JobSeekersService } from '../services/jobSeekers.service';

@Controller('job-seekers')
export class JobSeekersController {
  constructor(private readonly jobSeekersService: JobSeekersService) {}

  @Post()
  createJobSeeker(@Body() createJobSeekerDto: CreateJobSeekerDto) {
    return this.jobSeekersService.create(createJobSeekerDto);
  }

  @Get()
  getAllJobSeekers() {
    return this.jobSeekersService.findAll();
  }
}
