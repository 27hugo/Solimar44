import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autos } from './../entities/autos.entity';

@Injectable()
export class AutosService {
    constructor(
        @InjectRepository(Autos) private autosRepo: Repository<Autos>,
      ) {}
    
      findAll() {
        return this.autosRepo.find();
      }
    
      findOne(aut_id: number) {
        return this.autosRepo.findOne(aut_id);
      }

      findByPatente(aut_patente: string){
        return this.autosRepo.findOne({ where: { aut_patente: aut_patente }});
      }
    
      create(auto: Autos) {
        return this.autosRepo.save(auto);
      }
    
      async update(aut_id: number, auto: Autos) {
        const autoFound = await this.autosRepo.findOne(aut_id);
        this.autosRepo.merge(autoFound, auto);
        return this.autosRepo.save(auto);
      }
    
      async remove(aut_id: number) {
        await this.autosRepo.delete(aut_id);
        return true;
      }
}
