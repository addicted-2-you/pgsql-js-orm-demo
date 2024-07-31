import * as bcrypt from 'bcrypt';

import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.users.findMany({});
  }

  async findOne(id: string) {
    return await this.prismaService.users.findFirst({ where: { id } });
  }

  async getUserFolloweeIds(userId: string) {
    const userWithFollowees = await this.prismaService.follow_requests.findMany(
      {
        where: { follower_id: userId },
        include: {
          users_follow_requests_followee_idTousers: true,
        },
        orderBy: { created_at: 'desc' },
      },
    );

    if (!userWithFollowees) {
      return null;
    }

    return userWithFollowees
      .filter(
        (uwf) =>
          uwf &&
          uwf.users_follow_requests_followee_idTousers &&
          !uwf.users_follow_requests_followee_idTousers.deleted_at,
      )
      .map((uwf) => uwf.users_follow_requests_followee_idTousers.id);
  }

  async getPopularUserIds(take: number = 10) {
    const userFollowers = await this.prismaService.follow_requests.groupBy({
      by: ['followee_id'],
      _count: {
        follower_id: true,
      },
    });

    return userFollowers
      .sort((a, b) => b._count.follower_id - a._count.follower_id)
      .slice(0, take)
      .map((uf) => uf.followee_id);
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      +process.env.SALT_ROUNDS,
    );

    createUserDto.password = hashedPassword;

    return this.prismaService.users.create({
      data: createUserDto,
    });
  }
}
