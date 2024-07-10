import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return await this.prisma.users.findFirst({ where: { id } });
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 5);

    createUserDto.password = hashedPassword;

    return this.prisma.users.create({
      data: createUserDto,
    });
  }
}
