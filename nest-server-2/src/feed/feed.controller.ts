import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FeedService } from './feed.service';
import { User } from 'src/shared/decorators/user.decorator';

@Controller('feed')
@ApiTags('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('v1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async listPosts(@Request() req) {
    return await this.feedService.getFeedV1(req.user.id);
  }
}
