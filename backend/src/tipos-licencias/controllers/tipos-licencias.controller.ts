import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from 'src/shared/auth.guard';

import { TiposLicenciasService } from './../services/tipos-licencias.service';

@Controller('api/tipos-licencias')
//@UseGuards(new AuthGuard())
export class TiposLicenciasController {
    
    constructor(
        private tiposLicenciasService: TiposLicenciasService
      ) {}
    
      @Get()
      findAll() {
        return this.tiposLicenciasService.findAll();
      }
    
      @Get(':tip_id')
      findOne(@Param('tip_id') tip_id: number) {
        return this.tiposLicenciasService.findOne(tip_id);
      }

      @Get('licencia/:lic_id')
      async findByLicId(@Param('lic_id') lic_id: number) {
        return await this.tiposLicenciasService.findByLicId(lic_id);
      }
    
      @Post()
      create(@Body() body: any) {
        return this.tiposLicenciasService.create(body);
      }
    
      @Put(':tip_id')
      update(@Param('tip_id') tip_id: number, @Body() body: any) {
        return this.tiposLicenciasService.update(tip_id, body);
      }
    
      @Delete(':tip_id')
      delete(@Param('tip_id') tip_id: number) {
        return this.tiposLicenciasService.remove(tip_id);
      }
}
