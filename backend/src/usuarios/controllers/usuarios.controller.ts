import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from 'src/shared/auth.guard';

import { UsuariosService } from './../services/usuarios.service';

@Controller('api/usuarios')
//@UseGuards(new AuthGuard())
export class UsuariosController {

  constructor(
    private usuariosService: UsuariosService
  ) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':usr_id')
  findOne(@Param('usr_id') usr_id: number) {
    return this.usuariosService.findOne(usr_id);
  }

  @Post()
  create(@Body() body: any) {
    return this.usuariosService.create(body);
  }

  @Put(':usr_id')
  update(@Param('usr_id') usr_id: number, @Body() body: any) {
    return this.usuariosService.update(usr_id, body);
  }

  @Delete(':usr_id')
  delete(@Param('usr_id') usr_id: number) {
    return this.usuariosService.remove(usr_id);
  }

}