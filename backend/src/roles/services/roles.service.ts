import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './../entities/roles.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles) private rolesRepo: Repository<Roles>,
      ) {}
    
      findAll() {
        return this.rolesRepo.find();
      }
    
      findOne(rol_id: number) {
        return this.rolesRepo.findOne(rol_id);
      }
    
      create(rol: Roles) {
        return this.rolesRepo.save(rol);
      }
    
      async update(rol_id: number, rol: Roles) {
        const rolFound = await this.rolesRepo.findOne(rol_id);
        this.rolesRepo.merge(rolFound, rol);
        return this.rolesRepo.save(rol);
      }
    
      async remove(rol_id: number) {
        await this.rolesRepo.delete(rol_id);
        return true;
      }
}
