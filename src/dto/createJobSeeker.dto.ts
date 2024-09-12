import { IsString, IsArray, IsInt } from 'class-validator';

export class CreateJobSeekerDto {
  @IsString()
  name: string;

  @IsArray()
  @IsInt({ each: true })
  skills: number[];
}
