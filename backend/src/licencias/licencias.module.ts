import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenciasController } from './controllers/licencias.controller';
import { Licencias } from './entities/licencias.entity';
import { LicenciasService } from './services/licencias.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Licencias])
  ],
  controllers: [LicenciasController],
  providers: [LicenciasService]
})
export class LicenciasModule {}
