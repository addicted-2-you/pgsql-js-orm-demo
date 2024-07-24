import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { UserDbDto } from 'src/users/dto/user-db.dto';

import { UserSearchDto } from './dto/user-search.dto';
import { Prisma } from '@prisma/client';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class AdminUsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: UserSearchDto): Promise<UserDbDto[]> {
    const {
      username,
      is_admin,
      page_number = 1,
      page_size = 10,
      order_by = 'created_at',
      order_direction = 'asc',
    } = params;

    const where: Prisma.usersWhereInput = {};
    if (username) {
      where.username = { contains: username, mode: 'insensitive' };
    }

    if (is_admin !== undefined) {
      where.is_admin = is_admin === true;
    }

    const orderBy = {};
    if (order_by) {
      orderBy[order_by] = order_direction;
    }

    return await this.prisma.users.findMany({
      where,
      orderBy,
      skip: (page_number - 1) * page_size,
      take: page_size,
    });
  }

  async findOne(id: string) {
    return await this.prisma.users.findFirst({ where: { id } });
  }

  async updateOne(id: string, userUpdateDto: UserUpdateDto) {
    if (userUpdateDto.password) {
      userUpdateDto.password = await bcrypt.hash(
        userUpdateDto.password,
        +process.env.SALT_ROUNDS,
      );
    }

    return await this.prisma.users.update({
      where: { id },
      data: userUpdateDto,
    });
  }

  async softDeleteOne(id: string) {
    return await this.prisma.users.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async restoreOne(id: string) {
    return await this.prisma.users.update({
      where: { id },
      data: {
        deleted_at: null,
      },
    });
  }

  async destroyOne(id: string) {
    return await this.prisma.users.delete({
      where: { id },
    });
  }
}
