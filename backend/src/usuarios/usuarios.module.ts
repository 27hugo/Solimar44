import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Usuarios } from './entities/usuarios.entity';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controllers/usuarios.controller';
import { LicenciasService } from 'src/licencias/services/licencias.service';
import { Licencias } from 'src/licencias/entities/licencias.entity';
import { AuthService } from 'src/auth/services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios, Licencias])
  ],
  providers: [UsuariosService, LicenciasService],
  controllers: [UsuariosController],
})
export class UsuariosModule {}