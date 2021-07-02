import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { UsuariosService } from 'src/usuarios/services/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async validateUser(usr_rut: string, usr_contrasena: string): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(usr_contrasena, salt);
    
    const usuario = await this.usuariosService.findOne(usr_rut);
    if(!usuario){
        throw new HttpException('El usuario ingresado no existe.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if(usuario && !usuario.usr_contrasena){
      throw new HttpException('No tienes acceso al sistema.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    if (await bcrypt.compare(usr_contrasena, usuario.usr_contrasena)) {
      const { usr_contrasena, ...result } = usuario;
      return result;
    }
    throw new HttpException('La contraseña ingresada no es válida.', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async login(usuario: Usuarios) {
    const payload = { 
        usr_rut: usuario.usr_rut, 
        usr_correo: usuario.usr_correo,
        usr_nombre: usuario.usr_nombre,
        usr_apellido: usuario.usr_apellido,
        lic_id: usuario.lic_id,
        roles: usuario.roles
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}