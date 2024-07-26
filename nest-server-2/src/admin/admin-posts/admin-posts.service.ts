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

    const whereConditions: string[] = [];
    if (title) {
      whereConditions.push(`similarity(title, '${title}') > 0.01`);
    }

    if (content) {
      whereConditions.push(`similarity(content, '${content}') > 0.01`);
    }

    if (is_deleted) {
      whereConditions.push(`deleted_at IS NOT NULL`);
    } else {
      whereConditions.push(`deleted_at IS NULL`);
    }

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(' AND ')}`
        : '';
    const orderByClause = `ORDER BY ${order_by} ${order_direction.toUpperCase()}`;
    const offset = (page_number - 1) * page_size;

    const query = `
      SELECT * FROM posts
      ${whereClause}
      ${orderByClause}
      LIMIT ${page_size}
      OFFSET ${offset}
    `;

    return await this.prisma.$queryRaw<PostDbDto[]>(Prisma.raw(query));
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
