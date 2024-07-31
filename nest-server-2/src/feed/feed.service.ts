import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/shared/decorators/user.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FeedService {
  private readonly logger = new Logger(FeedService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async getFolloweePosts(userId: string) {
    // TODO: show posts user hasn't seen yet first
    const followeeIds = await this.usersService.getUserFolloweeIds(userId);

    return this.prismaService.posts.findMany({
      where: {
        user_id: {
          in: followeeIds,
        },
      },

      orderBy: {
        created_at: 'desc',
      },

      take: 10,
    });
  }

  async getPopularPosts() {
    const postsViews = await this.prismaService.post_views.groupBy({
      by: ['post_id'],
      _count: {
        post_id: true,
      },
    });

    const popularPostIds = postsViews
      .sort((a, b) => b._count.post_id - a._count.post_id)
      .slice(0, 10)
      .map((p) => p.post_id);

    return this.prismaService.posts.findMany({
      where: {
        id: {
          in: popularPostIds,
        },
      },
    });
  }

  async getPopularUserPosts() {
    const popularUserIds = await this.usersService.getPopularUserIds();

    return this.prismaService.posts.findMany({
      where: {
        user_id: {
          in: popularUserIds,
        },
      },
    });
  }

  async getFeedV1(userId: string) {
    const resultPosts = [];

    const followeePosts = await this.getFolloweePosts(userId);
    const popularPosts = await this.getPopularPosts();
    const popularUserPosts = await this.getPopularUserPosts();

    resultPosts.push(...followeePosts);
    resultPosts.push(...popularPosts);
    resultPosts.push(...popularUserPosts);

    // keep posts unique
    const resultPostsMap = resultPosts.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});

    return Object.values(resultPostsMap);
  }
}
