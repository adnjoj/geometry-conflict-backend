import { Test, TestingModule } from '@nestjs/testing';
import { WeaponTypesController } from './weapon-types.controller';
import { WeaponTypesService } from './weapon-types.service';

describe('WeaponTypesController', () => {
  let controller: WeaponTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponTypesController],
      providers: [WeaponTypesService],
    }).compile();

    controller = module.get<WeaponTypesController>(WeaponTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
