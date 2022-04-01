import { Test, TestingModule } from '@nestjs/testing';
import { RolesServiceService } from './roles.service';

describe('RolesServiceService', () => {
  let service: RolesServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesServiceService],
    }).compile();

    service = module.get<RolesServiceService>(RolesServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
