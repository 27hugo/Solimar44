import { Injectable } from '@nestjs/common';
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

  findOne(usr_id: number) {
    return this.usuariosRepo.findOne(usr_id);
  }

  create(usr: Usuarios) {
    return this.usuariosRepo.save(usr);
  }

  async update(usr_id: number, usr: Usuarios) {
    const usrFound = await this.usuariosRepo.findOne(usr_id);
    this.usuariosRepo.merge(usrFound, usr);
    return this.usuariosRepo.save(usr);
  }

  async remove(usr_id: number) {
    await this.usuariosRepo.delete(usr_id);
    return true;
  }
}