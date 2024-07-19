import { Test, TestingModule } from '@nestjs/testing';
import { ChattController } from './chatt.controller';
import { ChattService } from './chatt.service';

describe('ChattController', () => {
  let controller: ChattController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChattController],
      providers: [ChattService],
    }).compile();

    controller = module.get<ChattController>(ChattController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
