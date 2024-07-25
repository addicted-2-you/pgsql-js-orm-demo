import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminUsersModule } from './admin/admin-users/admin-users.module';
import { AdminPostsModule } from './admin/admin-posts/admin-posts.module';

@Module({
  imports: [AuthModule, UsersModule, AdminUsersModule, AdminPostsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService],
})
export class AppModule {}
