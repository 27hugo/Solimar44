import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TiposLicencias } from './../entities/tipos-licencias.entity';

@Injectable()
export class TiposLicenciasService {
    constructor(
        @InjectRepository(TiposLicencias) private tiposLicenciasRepo: Repository<TiposLicencias>,
      ) {}
    
      findAll() {
        return this.tiposLicenciasRepo.find();
      }
    
      findOne(tip_id: number) {
        return this.tiposLicenciasRepo.findOne(tip_id);
      }
    
      create(rol: TiposLicencias) {
        return this.tiposLicenciasRepo.save(rol);
      }
    
      async update(tip_id: number, rol: TiposLicencias) {
        const tipoLicFound = await this.tiposLicenciasRepo.findOne(tip_id);
        this.tiposLicenciasRepo.merge(tipoLicFound, rol);
        return this.tiposLicenciasRepo.save(rol);
      }
    
      async remove(tip_id: number) {
        await this.tiposLicenciasRepo.delete(tip_id);
        return true;
      }
}