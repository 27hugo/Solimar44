import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesUsuariosController } from './controllers/roles-usuarios.controller';
import { RolesUsuarios } from './entities/roles-usuarios.entity';
import { RolesUsuariosService } from './services/roles-usuarios.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolesUsuarios])
  ],
  controllers: [RolesUsuariosController],
  providers: [RolesUsuariosService]
})
export class RolesUsuariosModule {}
