import { Test, TestingModule } from '@nestjs/testing';
import { GameObjectTypesService } from './game-object-types.service';

describe('GameObjectTypesService', () => {
  let service: GameObjectTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameObjectTypesService],
    }).compile();

    service = module.get<GameObjectTypesService>(GameObjectTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
