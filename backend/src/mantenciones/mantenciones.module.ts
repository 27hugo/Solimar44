import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Mantenciones } from './entity/mantenciones.entity';
import { MantencionesService } from './services/mantenciones.service';
import { MantencionesController } from './controllers/mantenciones.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mantenciones])
  ],
  providers: [MantencionesService],
  controllers: [MantencionesController]
})
export class MantencionesModule {}