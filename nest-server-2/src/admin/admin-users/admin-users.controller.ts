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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminUsersService } from './admin-users.service';
import { UserSearchDto } from './dto/user-search.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('admin/users')
@ApiTags('admin/user')
export class AdminUsersController {
  constructor(private adminUsersService: AdminUsersService) {}

  @Get()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async listUsers(
    @Query()
    query: UserSearchDto,
  ) {
    return await this.adminUsersService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async getOne(@Param('id') id: string) {
    const user = await this.adminUsersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
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
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async unarchiveUser(@Param('id') id: string) {
    const user = await this.adminUsersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.adminUsersService.restoreOne(id);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async archiveUser(@Param('id') id: string) {
    const user = await this.adminUsersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.adminUsersService.softDeleteOne(id);
  }

  @Delete(':id/hard')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async destroyUser(@Param('id') id: string) {
    const user = await this.adminUsersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.adminUsersService.destroyOne(id);
  }
}
