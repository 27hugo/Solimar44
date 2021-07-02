import { Module } from '@nestjs/common';
import { UsuariosAutosService } from './services/usuarios-autos.service';
import { UsuariosAutosController } from './controllers/usuarios-autos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosAutos } from './entities/usuarios-autos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuariosAutos])
  ],
  providers: [UsuariosAutosService],
  controllers: [UsuariosAutosController]
})
export class UsuariosAutosModule {}
