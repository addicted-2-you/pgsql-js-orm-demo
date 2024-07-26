import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class PostUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiPropertyOptional({
    description: 'The new title to set for the post',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The new content to set for the post',
  })
  content?: string;
}
