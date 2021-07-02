import { Test, TestingModule } from '@nestjs/testing';
import { MantencionesController } from './mantenciones.controller';

describe('MantencionesController', () => {
  let controller: MantencionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MantencionesController],
    }).compile();

    controller = module.get<MantencionesController>(MantencionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
