import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from 'src/shared/auth.guard';

import { MantencionesService } from './../services/mantenciones.service';

@Controller('api/mantenciones')
//@UseGuards(new AuthGuard())
export class MantencionesController {
    
    constructor(
        private mantencionesService: MantencionesService
      ) {}
    
      @Get()
      findAll() {
        return this.mantencionesService.findAll();
      }
    
      @Get(':man_id')
      findOne(@Param('man_id') man_id: number) {
        return this.mantencionesService.findOne(man_id);
      }
    
      @Post()
      create(@Body() body: any) {
        return this.mantencionesService.create(body);
      }
    
      @Put(':man_id')
      update(@Param('man_id') man_id: number, @Body() body: any) {
        return this.mantencionesService.update(man_id, body);
      }
    
      @Delete(':man_id')
      delete(@Param('man_id') man_id: number) {
        return this.mantencionesService.remove(man_id);
      }
}
