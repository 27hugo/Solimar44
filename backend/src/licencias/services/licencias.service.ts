import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Licencias } from '../entities/licencias.entity';

@Injectable()
export class LicenciasService {
    constructor(
        @InjectRepository(Licencias) private licenciasRepo: Repository<Licencias>,
      ) {}
    
      findAll() {
        return this.licenciasRepo.find();
      }
    
      findOne(lic_id: number) {
        return this.licenciasRepo.findOne(lic_id);
      }
    
      create(licencia: Licencias) {
        return this.licenciasRepo.save(licencia);
      }
    
      async update(lic_id: number, licencia: Licencias) {
        const licenciaFound = await this.licenciasRepo.findOne(lic_id);
        this.licenciasRepo.merge(licenciaFound, licencia);
        return this.licenciasRepo.save(licencia);
      }
    
      async remove(lic_id: number) {
        await this.licenciasRepo.delete(lic_id);
        return true;
      }
}
