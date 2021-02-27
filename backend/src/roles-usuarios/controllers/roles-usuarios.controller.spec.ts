import { Test, TestingModule } from '@nestjs/testing';
import { RolesUsuariosController } from './roles-usuarios.controller';

describe('RolesUsuariosController', () => {
  let controller: RolesUsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesUsuariosController],
    }).compile();

    controller = module.get<RolesUsuariosController>(RolesUsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
