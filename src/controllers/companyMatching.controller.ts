import { Controller, Get, Param } from '@nestjs/common';
import { CompanyMatchingService } from '../services/companyMatching.service';

@Controller('company-matching')
export class CompanyMatchingController {
  constructor(
    private readonly companyMatchingService: CompanyMatchingService,
  ) {}

  @Get('/:companyId')
  findCandidates(@Param('companyId') companyId: string) {
    return this.companyMatchingService.findCandidates(companyId);
  }
}
