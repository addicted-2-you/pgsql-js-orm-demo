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

import { AdminPostsService } from './admin-posts.service';
import { AdminGuard } from 'src/auth/admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostSearchDto } from './dto/post-search.dto';
import { PostUpdateDto } from './dto/post-update.dto';

@Controller('admin-posts')
@ApiTags('admin/posts')
export class AdminPostsController {
  constructor(private adminPostsService: AdminPostsService) {}

  @Get()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async listPosts(
    @Query()
    query: PostSearchDto,
  ) {
    return this.adminPostsService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async getOne(@Param('id') id: string) {
    const post = await this.adminPostsService.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async updatePost(
    @Param('id') id: string,
    @Body() postUpdateDto: PostUpdateDto,
  ) {
    if (!Object.keys(postUpdateDto).length) {
      throw new BadRequestException(
        'At least one update field should be defined',
      );
    }

    const post = await this.adminPostsService.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return this.adminPostsService.updateOne(id, postUpdateDto);
  }

  @Put('restore/:id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async unarchivePost(@Param('id') id: string) {
    const post = await this.adminPostsService.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return this.adminPostsService.restoreOne(id);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async archivePost(@Param('id') id: string) {
    const post = await this.adminPostsService.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return this.adminPostsService.softDeleteOne(id);
  }

  @Delete(':id/hard')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async destroyPost(@Param('id') id: string) {
    const post = await this.adminPostsService.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return this.adminPostsService.destroyOne(id);
  }
}
