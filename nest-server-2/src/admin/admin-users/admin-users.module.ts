import { Module } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { AdminUsersController } from './admin-users.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, AdminUsersService],
  controllers: [AdminUsersController],
})
export class AdminUsersModule {}
