import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSkillDto } from '../dto/createSkill.dto';
import { SkillsService } from 'src/services/skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  createSkill(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  getAllSkills() {
    return this.skillsService.findAll();
  }
}
