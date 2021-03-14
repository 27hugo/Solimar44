import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosAutos } from './../entities/usuarios-autos.entity';

@Injectable()
export class UsuariosAutosService {

  constructor(
    @InjectRepository(UsuariosAutos) private usuariosAutosRepo: Repository<UsuariosAutos>,
  ) {}

  findAll() {
    return this.usuariosAutosRepo.find();
  }

  findOne(uas_id: number) {
    return this.usuariosAutosRepo.findOne(uas_id);
  }

  findByUsrRut(usr_rut: string) {
    return this.usuariosAutosRepo.find({ 
      where: { 
        usr_rut: usr_rut 
      },
      relations: ['autos'],
    });
  }

  create(uas: UsuariosAutos) {
    return this.usuariosAutosRepo.save(uas);
  }

  async update(uas_id: number, uas: UsuariosAutos) {
    const uasFound = await this.usuariosAutosRepo.findOne(uas_id);
    this.usuariosAutosRepo.merge(uasFound, uas);
    return this.usuariosAutosRepo.save(uas);
  }

  async remove(uas_id: number) {
    await this.usuariosAutosRepo.delete(uas_id);
    return true;
  }
}