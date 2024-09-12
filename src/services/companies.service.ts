import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from '../dto/createCompany.dto';
import { Company } from '../entities/company.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepo.create(createCompanyDto);
    return this.companyRepo.save(company);
  }

  findAll() {
    return this.companyRepo.find();
  }
}
