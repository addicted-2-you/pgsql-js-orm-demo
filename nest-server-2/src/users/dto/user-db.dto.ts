import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsUUID,
  IsDate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDbDto {
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
    minLength: 6,
  })
  password: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Admin status of the user',
    example: false,
  })
  is_admin?: boolean;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Creation date of the user record',
    example: '2023-07-24T14:48:00.000Z',
  })
  created_at?: Date;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Last update date of the user record',
    example: '2023-07-24T14:48:00.000Z',
  })
  updated_at?: Date;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Deletion date of the user record',
    example: '2023-07-24T14:48:00.000Z',
  })
  deleted_at?: Date;
}
