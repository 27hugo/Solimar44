import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
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

  @Get('usuario/:usr_rut')
  findByUsrRut(@Param('usr_rut') usr_rut: string){
    return this.usuariosAutosService.findByUsrRut(usr_rut);
  }

  @Post()
  async create(@Body() body: any) {
    const uas = await this.usuariosAutosService.findByAutIdUsrRut(body.aut_id, body.usr_rut);
    if(uas.length > 0){
      throw new HttpException('El auto ya se encuentra asignado al usuario.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return await this.usuariosAutosService.create(body);
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