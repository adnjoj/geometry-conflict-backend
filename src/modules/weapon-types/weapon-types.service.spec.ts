import { Test, TestingModule } from '@nestjs/testing';
import { WeaponTypesService } from './weapon-types.service';

describe('WeaponTypesService', () => {
  let service: WeaponTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeaponTypesService],
    }).compile();

    service = module.get<WeaponTypesService>(WeaponTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
