import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_JWT_KEY,
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
  ],
  providers: [PrismaService, JwtStrategy, AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
