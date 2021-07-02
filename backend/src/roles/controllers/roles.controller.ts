import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from 'src/shared/auth.guard';

import { RolesService } from './../services/roles.service';

@Controller('api/roles')
//@UseGuards(new AuthGuard())
export class RolesController {
    
    constructor(
        private rolesService: RolesService
      ) {}
    
      @Get()
      findAll() {
        return this.rolesService.findAll();
      }
    
      @Get(':rol_id')
      findOne(@Param('rol_id') rol_id: number) {
        return this.rolesService.findOne(rol_id);
      }
    
      @Post()
      create(@Body() body: any) {
        return this.rolesService.create(body);
      }
    
      @Put(':rol_id')
      update(@Param('rol_id') rol_id: number, @Body() body: any) {
        return this.rolesService.update(rol_id, body);
      }
    
      @Delete(':rol_id')
      delete(@Param('rol_id') rol_id: number) {
        return this.rolesService.remove(rol_id);
      }
}
