import { Test, TestingModule } from '@nestjs/testing';
import { AdminPostsService } from './admin-posts.service';

describe('AdminPostsService', () => {
  let service: AdminPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminPostsService],
    }).compile();

    service = module.get<AdminPostsService>(AdminPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
