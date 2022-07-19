import { Test, TestingModule } from '@nestjs/testing';
import { GameObjectTypesController } from './game-object-types.controller';
import { GameObjectTypesService } from './game-object-types.service';

describe('GameObjectTypesController', () => {
  let controller: GameObjectTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameObjectTypesController],
      providers: [GameObjectTypesService],
    }).compile();

    controller = module.get<GameObjectTypesController>(GameObjectTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
