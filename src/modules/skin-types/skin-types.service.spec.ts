import { Test, TestingModule } from '@nestjs/testing';
import { SkinTypesService } from './skin-types.service';

describe('SkinTypesService', () => {
  let service: SkinTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkinTypesService],
    }).compile();

    service = module.get<SkinTypesService>(SkinTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
