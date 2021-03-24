import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { rmdir } from 'fs/promises';
import { diskStorage } from 'multer';
import { LicenciasService } from 'src/licencias/services/licencias.service';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from 'src/shared/auth.guard';
import { UsuariosService } from './../services/usuarios.service';
import * as bcrypt from 'bcrypt';

@Controller('api/usuarios')
//@UseGuards(new AuthGuard())
export class UsuariosController {

  constructor(
    private usuariosService: UsuariosService,
    private licenciasService: LicenciasService,
  ) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':usr_rut')
  findOne(@Param('usr_rut') usr_rut: string) {
    return this.usuariosService.findOne(usr_rut);
  }

  @Post()
  async create(@Body() body: any ) {
    if(body.usr_contrasena){
      const hash = await bcrypt.hash(body.usr_contrasena, 10);
      body.usr_contrasena = hash;
    }
    return await this.usuariosService.create(body);
  }

  @Post('subirFotos')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'usr_foto', maxCount: 1 },
    { name: 'usr_cdi_frente', maxCount: 1 },
    { name: 'usr_cdi_reverso', maxCount: 1}
  ],{
    storage: diskStorage({
      destination: (req: any, file: any, cb: any) => {
        const uploadPath = './uploads/usuarios/cedula_identidad/' + req.body.usr_rut;
        // Create folder if doesn't exist
        if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      },
    })
  }))
  subirFotos(@UploadedFiles() fotos ) {
    return {
      usr_foto : fotos.usr_foto[0].filename,
      usr_cdi_frente : fotos.usr_cdi_frente[0].filename,
      usr_cdi_reverso : fotos.usr_cdi_reverso[0].filename
    };
  }

  @Put(':usr_rut')
  async update(@Param('usr_rut') usr_rut: string, @Body() body: any) {
    if(body.usr_contrasena){
      const hash = await bcrypt.hash(body.usr_contrasena, 10);
      body.usr_contrasena = hash;
    }
    return await this.usuariosService.update(usr_rut, body);
  }

  @Delete(':usr_rut')
  async delete(@Param('usr_rut') usr_rut: string) {
    const usr = await this.usuariosService.findOne(usr_rut);
    if(usr.lic_id){
      await this.licenciasService.remove(usr.lic_id);
      await rmdir('./uploads/usuarios/licencias/' + usr_rut, { recursive: true });
    }
    await rmdir('./uploads/usuarios/cedula_identidad/' + usr_rut, { recursive: true });
    return this.usuariosService.remove(usr_rut);
  }

}