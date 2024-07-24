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

export class SearchParamsDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Optional search parameter for filtering by username',
    example: 'john_doe',
  })
  username?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    }

    return false;
  })
  @ApiPropertyOptional({
    description: 'Optional search parameter for filtering by admin status',
    example: 'true',
  })
  is_admin?: boolean;

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
  @IsIn(['username', 'created_at', 'updated_at'])
  @ApiPropertyOptional({
    description: 'Field to order by',
    example: 'username',
    enum: ['username', 'created_at', 'updated_at'],
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
