import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Licencia } from './../entities/Licencia.entity';

@Injectable()
export class LicenciasService {
    constructor(
        @InjectRepository(Licencia) private licenciasRepo: Repository<Licencia>,
      ) {}
    
      findAll() {
        return this.licenciasRepo.find();
      }
    
      findOne(lic_id: number) {
        return this.licenciasRepo.findOne(lic_id);
      }
    
      create(licencia: Licencia) {
        return this.licenciasRepo.save(licencia);
      }
    
      async update(lic_id: number, licencia: Licencia) {
        const licenciaFound = await this.licenciasRepo.findOne(lic_id);
        this.licenciasRepo.merge(licenciaFound, licencia);
        return this.licenciasRepo.save(licencia);
      }
    
      async remove(lic_id: number) {
        await this.licenciasRepo.delete(lic_id);
        return true;
      }
}
