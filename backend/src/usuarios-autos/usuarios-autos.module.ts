import { Module } from '@nestjs/common';
import { UsuariosAutosService } from './services/usuarios-autos.service';
import { UsuariosAutosController } from './controllers/usuarios-autos.controller';

@Module({
  providers: [UsuariosAutosService],
  controllers: [UsuariosAutosController]
})
export class UsuariosAutosModule {}
