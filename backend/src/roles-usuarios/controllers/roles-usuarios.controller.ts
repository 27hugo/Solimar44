import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from 'src/shared/auth.guard';

import { RolesUsuariosService } from './../services/roles-usuarios.service';

@Controller('api/roles-usuarios')
//@UseGuards(new AuthGuard())
export class RolesUsuariosController {
    
    constructor(
        private rolesUsuariosService: RolesUsuariosService
      ) {}
    
      @Get()
      findAll() {
        return this.rolesUsuariosService.findAll();
      }
    
      @Get(':rus_id')
      findOne(@Param('rus_id') rus_id: number) {
        return this.rolesUsuariosService.findOne(rus_id);
      }
    
      @Post()
      create(@Body() body: any) {
        return this.rolesUsuariosService.create(body);
      }
    
      @Put(':rus_id')
      update(@Param('rus_id') rus_id: number, @Body() body: any) {
        return this.rolesUsuariosService.update(rus_id, body);
      }
    
      @Delete(':rus_id')
      delete(@Param('rus_id') rus_id: number) {
        return this.rolesUsuariosService.remove(rus_id);
      }
}
