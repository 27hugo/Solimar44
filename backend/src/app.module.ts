import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MantencionesModule } from './mantenciones/mantenciones.module';
import { AutosModule } from './autos/autos.module';
import { LicenciasModule } from './licencias/licencias.module';
import { RolesModule } from './roles/roles.module';
import { UsuariosAutosModule } from './usuarios-autos/usuarios-autos.module';
import { TiposLicenciasModule } from './tipos-licencias/tipos-licencias.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';

/* 
 * MYSQL_ROOT_PASSWORD= solimar44
 * MYSQL_DATABASE= solimar44
 * MYSQL_HOST= mariadb
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.MYSQL_HOST || 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'solimar44',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads/',
      }),
    }),
    UsuariosModule,
    MantencionesModule,
    AutosModule,
    LicenciasModule,
    RolesModule,
    UsuariosAutosModule,
    TiposLicenciasModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})


export class AppModule {}
