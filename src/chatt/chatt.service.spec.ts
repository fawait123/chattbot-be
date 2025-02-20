import { Test, TestingModule } from '@nestjs/testing';
import { ChattService } from './chatt.service';

describe('ChattService', () => {
  let service: ChattService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChattService],
    }).compile();

    service = module.get<ChattService>(ChattService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
