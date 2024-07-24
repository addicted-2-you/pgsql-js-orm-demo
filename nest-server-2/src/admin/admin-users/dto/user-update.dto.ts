import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiPropertyOptional({
    description: 'The new username to set',
    example: 'john_doe',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @ApiPropertyOptional({
    description: 'The new password to set',
    example: 'abc123',
  })
  password?: string;
}
