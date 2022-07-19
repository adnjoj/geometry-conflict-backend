import { Test, TestingModule } from '@nestjs/testing';
import { FractionsService } from './fractions.service';

describe('FractionsService', () => {
  let service: FractionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FractionsService],
    }).compile();

    service = module.get<FractionsService>(FractionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
