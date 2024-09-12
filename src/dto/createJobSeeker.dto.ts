import { IsString, IsArray, IsInt, IsUUID } from 'class-validator';

export class CreateJobSeekerDto {
  @IsString()
  name: string;

  @IsArray()
  @IsUUID('all', { each: true })
  skills: string[];
}
