import { Module } from '@nestjs/common';
import { AdminPostsService } from './admin-posts.service';
import { AdminPostsController } from './admin-posts.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AdminPostsService, PrismaService, UsersService, JwtService],
  controllers: [AdminPostsController],
})
export class AdminPostsModule {}
