import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosAutosController } from './usuarios-autos.controller';

describe('UsuariosAutosController', () => {
  let controller: UsuariosAutosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosAutosController],
    }).compile();

    controller = module.get<UsuariosAutosController>(UsuariosAutosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
