import { Test, TestingModule } from '@nestjs/testing';
import { FractionsController } from './fractions.controller';
import { FractionsService } from './fractions.service';

describe('FractionsController', () => {
  let controller: FractionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FractionsController],
      providers: [FractionsService],
    }).compile();

    controller = module.get<FractionsController>(FractionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
