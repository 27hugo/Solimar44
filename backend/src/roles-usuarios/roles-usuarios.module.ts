import { Module } from '@nestjs/common';
import { RolesUsuariosController } from './controllers/roles-usuarios.controller';
import { RolesUsuariosService } from './services/roles-usuarios.service';

@Module({
  controllers: [RolesUsuariosController],
  providers: [RolesUsuariosService]
})
export class RolesUsuariosModule {}
