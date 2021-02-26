import { Module } from '@nestjs/common';
import { AutosController } from './controllers/autos.controller';
import { AutosService } from './services/autos.service';

@Module({
  controllers: [AutosController],
  providers: [AutosService]
})
export class AutosModule {}
