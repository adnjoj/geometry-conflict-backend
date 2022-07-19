import { Test, TestingModule } from '@nestjs/testing';
import { SkinTypesController } from './skin-types.controller';
import { SkinTypesService } from './skin-types.service';

describe('SkinTypesController', () => {
  let controller: SkinTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkinTypesController],
      providers: [SkinTypesService],
    }).compile();

    controller = module.get<SkinTypesController>(SkinTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
