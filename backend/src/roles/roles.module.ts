import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles])
  ],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
