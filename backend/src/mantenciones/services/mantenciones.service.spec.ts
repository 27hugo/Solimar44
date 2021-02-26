import { Test, TestingModule } from '@nestjs/testing';
import { MantencionesService } from './mantenciones.service';

describe('MantencionesService', () => {
  let service: MantencionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MantencionesService],
    }).compile();

    service = module.get<MantencionesService>(MantencionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
