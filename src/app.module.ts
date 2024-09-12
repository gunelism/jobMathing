import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeeker } from './entities/jobSeeker.entity';
import { Company } from './entities/company.entity';
import { JobPosting } from './entities/jobPosting.entity';
import { CompanyMatchingController } from './controllers/companyMatching.controller';
import { CompanyMatchingService } from './services/companyMatching.service';
import { CompaniesController } from './controllers/companies.controller';
import { JobMatchingController } from './controllers/jobMatching.controller';
import { JobPostingController } from './controllers/jobPosting.controller';
import { JobSeekersController } from './controllers/jobSeekers.controller';
import { SkillsController } from './controllers/skills.controller';
import { CompaniesService } from './services/companies.service';
import { JobMatchingService } from './services/jobMatching.service';
import { JobPostingService } from './services/jobPosting.service';
import { SkillsService } from './services/skills.service';
import { JobSeekersService } from './services/jobSeekers.service';
import { Skill } from './entities/skill.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: 'postgress', // need to figure out why i cant use env here.
      database: process.env.DATABASE_NAME,
      entities: [JobSeeker, Company, JobPosting, Skill],
      synchronize: true, // Don't use this in production, use migrations
    }),
    TypeOrmModule.forFeature([JobSeeker, Company, JobPosting, Skill]),
  ],
  controllers: [
    JobSeekersController,
    SkillsController,
    JobPostingController,
    CompaniesController,
    JobMatchingController,
    CompanyMatchingController,
  ],
  providers: [
    JobSeekersService,
    SkillsService,
    JobPostingService,
    CompaniesService,
    JobMatchingService,
    CompanyMatchingService,
  ],
})
export class AppModule {}
