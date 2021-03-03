import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposLicenciasService } from './services/tipos-licencias.service';
import { TiposLicencias } from './entities/tipos-licencias.entity';
import { TiposLicenciasController } from './controllers/tipos-licencias.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TiposLicencias])
  ],
  providers: [TiposLicenciasService],
  controllers: [TiposLicenciasController]
})
export class TiposLicenciasModule {}
