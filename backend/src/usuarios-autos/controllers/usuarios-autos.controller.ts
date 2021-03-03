import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from 'src/shared/auth.guard';

import { UsuariosAutosService } from './../services/usuarios-autos.service';

@Controller('api/usuarios-autos')
//@UseGuards(new AuthGuard())
export class UsuariosAutosController {

  constructor(
    private usuariosAutosService: UsuariosAutosService
  ) {}

  @Get()
  findAll() {
    return this.usuariosAutosService.findAll();
  }

  @Get(':uas_id')
  findOne(@Param('uas_id') uas_id: number) {
    return this.usuariosAutosService.findOne(uas_id);
  }

  @Get('usuario/:usr_id')
  findByUsrId(@Param('usr_id') usr_id: number){
    return this.usuariosAutosService.findByUsrId(usr_id);
  }

  @Post()
  create(@Body() body: any) {
    return this.usuariosAutosService.create(body);
  }

  @Put(':uas_id')
  update(@Param('uas_id') uas_id: number, @Body() body: any) {
    return this.usuariosAutosService.update(uas_id, body);
  }

  @Delete(':uas_id')
  delete(@Param('uas_id') uas_id: number) {
    return this.usuariosAutosService.remove(uas_id);
  }

}