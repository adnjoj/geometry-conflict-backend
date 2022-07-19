import { Test, TestingModule } from '@nestjs/testing';
import { GameObjectsController } from './game-objects.controller';
import { GameObjectsService } from './game-objects.service';

describe('GameObjectsController', () => {
  let controller: GameObjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameObjectsController],
      providers: [GameObjectsService],
    }).compile();

    controller = module.get<GameObjectsController>(GameObjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
