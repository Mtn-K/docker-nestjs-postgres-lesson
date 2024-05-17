import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @MinLength(10, {
    message:
      'Content is too short, minimal length is $constraint1 characters, but actual is $value',
  })
  body: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
