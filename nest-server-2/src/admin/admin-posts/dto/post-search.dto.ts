import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
  IsIn,
  IsBoolean,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PostSearchDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Optional search parameter for filtering by post title',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Optional search parameter for filtering by user ID',
  })
  user_id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Optional search parameter for filtering by content',
  })
  content?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @ApiPropertyOptional({
    description: 'Optional search parameter for filtering by deletion status',
    example: 'false',
  })
  is_deleted?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    minimum: 1,
  })
  page_number?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @ApiPropertyOptional({
    description: 'Page size for pagination',
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  page_size?: number;

  @IsOptional()
  @IsString()
  @IsIn(['title', 'created_at', 'updated_at'])
  @ApiPropertyOptional({
    description: 'Field to order by',
    example: 'created_at',
    enum: ['title', 'created_at', 'updated_at'],
  })
  order_by?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  @ApiPropertyOptional({
    description: 'Order direction',
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  order_direction?: string;
}
