import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './../entities/usuarios.entity';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuarios) private usuariosRepo: Repository<Usuarios>,
  ) {}

  findAll() {
    return this.usuariosRepo.find();
  }

  findOne(usr_rut: string) {
    return this.usuariosRepo.findOne(usr_rut);
  }

  async create(usr: Usuarios) {
    if(await this.usuariosRepo.findOne(usr.usr_rut)){
      throw new HttpException('El usuario ya se encuentra registrado.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if(await this.usuariosRepo.findOne({ where: { usr_correo: usr.usr_correo } })){
      throw new HttpException('El correo ya se encuentra registrado.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
     
    return await this.usuariosRepo.save(usr);
  }

  async update(usr_rut: string, usr: Usuarios) {
    const usrFound = await this.usuariosRepo.findOne(usr_rut);
    this.usuariosRepo.merge(usrFound, usr);
    return this.usuariosRepo.save(usr);
  }

  async remove(usr_rut: string) {
    await this.usuariosRepo.delete(usr_rut);
    return true;
  }
}