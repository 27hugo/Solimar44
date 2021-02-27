import { Module } from '@nestjs/common';
import { LicenciasController } from './controllers/licencias.controller';
import { LicenciasService } from './services/licencias.service';

@Module({
  controllers: [LicenciasController],
  providers: [LicenciasService]
})
export class LicenciasModule {}
