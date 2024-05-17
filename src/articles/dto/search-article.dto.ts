import { IsOptional, IsString } from 'class-validator';

export class CreateSearchDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  topic?: string;
}
