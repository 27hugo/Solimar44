import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesUsuarios } from './../entities/roles-usuarios.entity';

@Injectable()
export class RolesUsuariosService {
    constructor(
        @InjectRepository(RolesUsuarios) private rolesUsuariosRepo: Repository<RolesUsuarios>,
      ) {}
    
      findAll() {
        return this.rolesUsuariosRepo.find();
      }
    
      findOne(rus_id: number) {
        return this.rolesUsuariosRepo.findOne(rus_id);
      }
    
      create(rol: RolesUsuarios) {
        return this.rolesUsuariosRepo.save(rol);
      }
    
      async update(rus_id: number, rol: RolesUsuarios) {
        const rolUsuarioFound = await this.rolesUsuariosRepo.findOne(rus_id);
        this.rolesUsuariosRepo.merge(rolUsuarioFound, rol);
        return this.rolesUsuariosRepo.save(rol);
      }
    
      async remove(rus_id: number) {
        await this.rolesUsuariosRepo.delete(rus_id);
        return true;
      }
}
