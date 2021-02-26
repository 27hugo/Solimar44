import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mantenciones } from './../entity/mantenciones.entity';

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
    
      create(usr: Mantenciones) {
        return this.mantencionesRepo.save(usr);
      }
    
      async update(man_id: number, usr: Mantenciones) {
        const usrFound = await this.mantencionesRepo.findOne(man_id);
        this.mantencionesRepo.merge(usrFound, usr);
        return this.mantencionesRepo.save(usr);
      }
    
      async remove(man_id: number) {
        await this.mantencionesRepo.delete(man_id);
        return true;
      }
}
