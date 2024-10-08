import { IsString, IsArray, IsUUID } from 'class-validator';

export class CreateJobPostingDto {
  @IsString()
  title: string;

  @IsArray()
  @IsUUID('all', { each: true })
  requiredSkills: string[];

  @IsUUID()
  companyId: string;
}
