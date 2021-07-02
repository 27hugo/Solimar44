import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mantenciones } from './../entities/mantenciones.entity';

@Injectable()
export class MantencionesService {
    constructor(
        @InjectRepository(Mantenciones) private mantencionesRepo: Repository<Mantenciones>,
      ) {}
    
      findAll() {
        return this.mantencionesRepo.find();
      }
    
      findOne(man_id: number) {
        return this.mantencionesRepo.findOne(man_id);
      }
    
      create(mantencion: Mantenciones) {
        return this.mantencionesRepo.save(mantencion);
      }
    
      async update(man_id: number, mantencion: Mantenciones) {
        const manFound = await this.mantencionesRepo.findOne(man_id);
        this.mantencionesRepo.merge(manFound, mantencion);
        return this.mantencionesRepo.save(mantencion);
      }
    
      async remove(man_id: number) {
        await this.mantencionesRepo.delete(man_id);
        return true;
      }
}
