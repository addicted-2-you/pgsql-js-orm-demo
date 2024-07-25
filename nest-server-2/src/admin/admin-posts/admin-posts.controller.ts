import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { AdminPostsService } from './admin-posts.service';
import { AdminGuard } from 'src/auth/admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostSearchDto } from './dto/post-search.dto';

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
}
