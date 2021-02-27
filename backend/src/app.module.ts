import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MantencionesModule } from './mantenciones/mantenciones.module';
import { AutosModule } from './autos/autos.module';
import { LicenciasModule } from './licencias/licencias.module';
import { RolesModule } from './roles/roles.module';
import { RolesUsuariosModule } from './roles-usuarios/roles-usuarios.module';
import { UsuariosAutosModule } from './usuarios-autos/usuarios-autos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mydb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10
    }),
    UsuariosModule,
    MantencionesModule,
    AutosModule,
    LicenciasModule,
    RolesModule,
    RolesUsuariosModule,
    UsuariosAutosModule,
  ],
  controllers: [],
  providers: [],
})


export class AppModule {}
