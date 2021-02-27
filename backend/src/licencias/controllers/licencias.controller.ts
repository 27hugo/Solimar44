import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from 'src/shared/auth.guard';

import { LicenciasService } from './../services/licencias.service';

@Controller('api/licencias')
//@UseGuards(new AuthGuard())
export class LicenciasController {
    
    constructor(
        private licenciasService: LicenciasService
      ) {}
    
      @Get()
      findAll() {
        return this.licenciasService.findAll();
      }
    
      @Get(':lic_id')
      findOne(@Param('lic_id') lic_id: number) {
        return this.licenciasService.findOne(lic_id);
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
