import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminUsersService } from './admin-users.service';
import { SearchParamsDto } from './dto/user-search.dto';

@Controller('admin/users')
@ApiTags('admin/user')
export class AdminUsersController {
  constructor(private adminUsersService: AdminUsersService) {}

  @Get()
  async getUsers(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: SearchParamsDto,
  ) {
    return await this.adminUsersService.findAll(query);
  }
}
