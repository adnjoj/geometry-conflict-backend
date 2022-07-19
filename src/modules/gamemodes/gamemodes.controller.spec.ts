import { Test, TestingModule } from '@nestjs/testing';
import { GamemodesController } from './gamemodes.controller';
import { GamemodesService } from './gamemodes.service';

describe('GamemodesController', () => {
  let controller: GamemodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamemodesController],
      providers: [GamemodesService],
    }).compile();

    controller = module.get<GamemodesController>(GamemodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
