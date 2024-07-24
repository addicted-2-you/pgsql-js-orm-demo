import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthEntity } from './entity/auth.entity';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signup(username: string, password: string) {
    await this.usersService.create({ username, password });
    return await this.signin({ username, password });
  }

  async signin(signinDto: SigninDto): Promise<AuthEntity> {
    const { username, password } = signinDto;

    const user = await this.prisma.users.findFirst({ where: { username } });
    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
