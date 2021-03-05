import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TiposLicenciasService } from 'src/tipos-licencias/services/tipos-licencias.service';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from 'src/shared/auth.guard';

import { LicenciasService } from './../services/licencias.service';

@Controller('api/licencias')
//@UseGuards(new AuthGuard())
export class LicenciasController {
    
    constructor(
        private licenciasService: LicenciasService,
        private tiposLicenciasService: TiposLicenciasService
      ) {}
    
      @Get()
      findAll() {
        return this.licenciasService.findAll();
      }
    
      @Get(':lic_id')
      async findOne(@Param('lic_id') lic_id: number) {
        let licencia = await this.licenciasService.findOne(lic_id);
        const tiposLicencias = await this.tiposLicenciasService.findByLicId(lic_id);
        licencia = Object.assign(licencia, { lic_tipos: tiposLicencias});
        return licencia;
      }
    
      @Post()
      create(@Body() body: any) {
        return this.licenciasService.create(body);
      }
    
      @Put(':lic_id')
      update(@Param('lic_id') lic_id: number, @Body() body: any) {
        return this.licenciasService.update(lic_id, body);
      }
    
      @Delete(':lic_id')
      delete(@Param('lic_id') lic_id: number) {
        return this.licenciasService.remove(lic_id);
      }
}
