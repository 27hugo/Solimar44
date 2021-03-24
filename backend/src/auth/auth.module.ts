import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { UsuariosService } from 'src/usuarios/services/usuarios.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { AuthController } from './controllers/auth.controller';
import { RolesService } from 'src/roles/services/roles.service';
import { Roles } from 'src/roles/entities/roles.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([Usuarios]),
  ], 
  providers: [AuthService, UsuariosService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
