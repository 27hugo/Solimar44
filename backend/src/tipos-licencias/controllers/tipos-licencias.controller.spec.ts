import { Test, TestingModule } from '@nestjs/testing';
import { TiposLicenciasController } from './tipos-licencias.controller';

describe('TiposLicenciasController', () => {
  let controller: TiposLicenciasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposLicenciasController],
    }).compile();

    controller = module.get<TiposLicenciasController>(TiposLicenciasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
