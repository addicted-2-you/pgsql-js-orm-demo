import { Injectable } from '@nestjs/common';
import { PostDbDto } from 'src/posts/dto/post-db.dto';
import { PrismaService } from 'src/prisma.service';
import { PostSearchDto } from './dto/post-search.dto';
import { Prisma } from '@prisma/client';
import { PostUpdateDto } from './dto/post-update.dto';

@Injectable()
export class AdminPostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: PostSearchDto): Promise<PostDbDto[]> {
    const {
      title,
      content,
      is_deleted,
      page_number = 1,
      page_size = 10,
      order_by = 'created_at',
      order_direction = 'asc',
    } = params;

    const where: Prisma.postsWhereInput = {};
    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }

    if (content) {
      where.content = { contains: content, mode: 'insensitive' };
    }

    if (is_deleted) {
      where.deleted_at = { not: null };
    }

    const orderBy: Prisma.postsOrderByWithRelationInput = {};
    if (orderBy) {
      orderBy[order_by] = order_direction;
    }

    return await this.prisma.posts.findMany({
      where,
      orderBy,
      skip: (page_number - 1) * page_size,
      take: page_size,
    });
  }

  async findOne(id: string): Promise<PostDbDto | null> {
    return this.prisma.posts.findFirst({ where: { id } });
  }

  async updateOne(id: string, postUpdateDto: PostUpdateDto) {
    return await this.prisma.users.update({
      where: { id },
      data: postUpdateDto,
    });
  }

  async softDeleteOne(id: string) {
    return await this.prisma.posts.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  async restoreOne(id: string) {
    return await this.prisma.posts.update({
      where: { id },
      data: { deleted_at: null },
    });
  }

  async destroyOne(id: string) {
    return await this.prisma.posts.delete({ where: { id } });
  }
}
