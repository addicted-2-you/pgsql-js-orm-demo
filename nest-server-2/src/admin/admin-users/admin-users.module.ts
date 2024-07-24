import { Module } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { AdminUsersController } from './admin-users.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PrismaService, AdminUsersService, JwtService, UsersService],
  controllers: [AdminUsersController],
})
export class AdminUsersModule {}
