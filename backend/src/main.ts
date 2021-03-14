import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  if (!existsSync('./uploads')) {
      mkdirSync('./uploads');
      mkdirSync('./uploads/usuarios');
      mkdirSync('./uploads/usuarios/cedula_identidad');
      mkdirSync('./uploads/usuarios/licencias');
  }
  await app.listen(8080);
}
bootstrap();
