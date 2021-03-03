import { Test, TestingModule } from '@nestjs/testing';
import { TiposLicenciasService } from './tipos-licencias.service';

describe('TiposLicenciasService', () => {
  let service: TiposLicenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposLicenciasService],
    }).compile();

    service = module.get<TiposLicenciasService>(TiposLicenciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
