import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosAutosService } from './usuarios-autos.service';

describe('UsuariosAutosService', () => {
  let service: UsuariosAutosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosAutosService],
    }).compile();

    service = module.get<UsuariosAutosService>(UsuariosAutosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
