import { Test, TestingModule } from '@nestjs/testing';
import { GamemodesService } from './gamemodes.service';

describe('GamemodesService', () => {
  let service: GamemodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamemodesService],
    }).compile();

    service = module.get<GamemodesService>(GamemodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
