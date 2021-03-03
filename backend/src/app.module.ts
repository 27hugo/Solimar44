import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MantencionesModule } from './mantenciones/mantenciones.module';
import { AutosModule } from './autos/autos.module';
import { LicenciasModule } from './licencias/licencias.module';
import { RolesModule } from './roles/roles.module';
import { RolesUsuariosModule } from './roles-usuarios/roles-usuarios.module';
import { UsuariosAutosModule } from './usuarios-autos/usuarios-autos.module';
import { TiposLicenciasModule } from './tipos-licencias/tipos-licencias.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'solimar44',
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
    TiposLicenciasModule,
  ],
  controllers: [],
  providers: [],
})


export class AppModule {}
