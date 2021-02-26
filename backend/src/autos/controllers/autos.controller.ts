import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from 'src/shared/auth.guard';

import { AutosService } from './../services/autos.service';

@Controller('api/autos')
//@UseGuards(new AuthGuard())
export class AutosController {
    
    constructor(
        private autosService: AutosService
      ) {}
    
      @Get()
      findAll() {
        return this.autosService.findAll();
      }
    
      @Get(':aut_id')
      findOne(@Param('aut_id') aut_id: number) {
        return this.autosService.findOne(aut_id);
      }
    
      @Post()
      create(@Body() body: any) {
        return this.autosService.create(body);
      }
    
      @Put(':aut_id')
      update(@Param('aut_id') aut_id: number, @Body() body: any) {
        return this.autosService.update(aut_id, body);
      }
    
      @Delete(':aut_id')
      delete(@Param('aut_id') aut_id: number) {
        return this.autosService.remove(aut_id);
      }
}
