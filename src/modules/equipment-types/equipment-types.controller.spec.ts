import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentTypesController } from './equipment-types.controller';
import { EquipmentTypesService } from './equipment-types.service';

describe('EquipmentTypesController', () => {
  let controller: EquipmentTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentTypesController],
      providers: [EquipmentTypesService],
    }).compile();

    controller = module.get<EquipmentTypesController>(EquipmentTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
