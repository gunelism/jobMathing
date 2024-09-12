import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/createCompany.dto';
import { CompaniesService } from '../services/companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  getAllCompanies() {
    return this.companiesService.findAll();
  }
}
