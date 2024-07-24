import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminUsersService } from './admin-users.service';
import { UserSearchDto } from './dto/user-search.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('admin/users')
@ApiTags('admin/user')
export class AdminUsersController {
  constructor(private adminUsersService: AdminUsersService) {}

  @Get()
  async getUsers(
    @Query()
    query: UserSearchDto,
  ) {
    return await this.adminUsersService.findAll(query);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    if (!userUpdateDto.username && !userUpdateDto.password) {
      throw new BadRequestException(
        'At least one field (username or password) must be defined',
      );
    }

    const user = await this.adminUsersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const result = await this.adminUsersService.updateOne(id, userUpdateDto);
    delete result.password;
    return result;
  }

  @Put('restore/:id')
  async unarchiveUser(@Param('id') id: string) {
    const user = await this.adminUsersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.adminUsersService.restoreOne(id);
  }

  @Delete(':id')
  async archiveUser(@Param('id') id: string) {
    const user = await this.adminUsersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.adminUsersService.softDeleteOne(id);
  }

  @Delete(':id/hard')
  async destroyUser(@Param('id') id: string) {
    const user = await this.adminUsersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.adminUsersService.destroyOne(id);
  }
}
