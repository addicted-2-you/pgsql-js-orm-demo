import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsDate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PostDbDto {
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the post',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  id: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique identifier for the user who created the post',
    example: 'b1f2c3d4-5e6f-7a8b-9c0d-1e2f3g4h5i6j',
  })
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Title of the post',
    example: 'My First Post',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Content of the post',
    example: 'This is the content of my first post.',
  })
  content?: string;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Creation date of the post',
    example: '2023-07-24T14:48:00.000Z',
  })
  created_at?: Date;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Last update date of the post',
    example: '2023-07-24T14:48:00.000Z',
  })
  updated_at?: Date;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Deletion date of the post',
    example: '2023-07-24T14:48:00.000Z',
  })
  deleted_at?: Date;
}
