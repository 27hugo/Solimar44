import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposLicencias } from 'src/tipos-licencias/entities/tipos-licencias.entity';
import { TiposLicenciasService } from 'src/tipos-licencias/services/tipos-licencias.service';
import { LicenciasController } from './controllers/licencias.controller';
import { Licencias } from './entities/licencias.entity';
import { LicenciasService } from './services/licencias.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Licencias, TiposLicencias])
  ],
  controllers: [LicenciasController],
  providers: [LicenciasService, TiposLicenciasService]
})
export class LicenciasModule {}
