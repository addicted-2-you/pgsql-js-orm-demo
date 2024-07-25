import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiPropertyOptional({
    description: 'The new username to set',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @ApiPropertyOptional({
    description: 'The new password to set',
  })
  password?: string;
}
