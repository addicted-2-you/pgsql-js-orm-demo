import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('No token provided');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.SECRET_JWT_KEY,
      });
      const user = await this.usersService.findOne(decoded.userId);

      if (!user || !user.is_admin) {
        throw new ForbiddenException('Access denied');
      }

      return true;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Invalid token or access denied');
    }
  }
}
