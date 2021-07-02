import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutosController } from './controllers/autos.controller';
import { Autos } from './entities/autos.entity';
import { AutosService } from './services/autos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Autos])
  ],
  controllers: [AutosController],
  providers: [AutosService]
})
export class AutosModule {}
