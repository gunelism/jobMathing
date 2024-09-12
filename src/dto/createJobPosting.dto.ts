import { IsString, IsArray, IsInt } from 'class-validator';

export class CreateJobPostingDto {
  @IsString()
  title: string;

  @IsArray()
  @IsInt({ each: true })
  requiredSkills: number[];

  @IsInt()
  companyId: number;
}
