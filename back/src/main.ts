import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors();
  app.use(bodyParser.json())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Convierte automáticamente los datos a su tipo correspondiente (por ejemplo, convertir un string a un número)
      whitelist: true, // Elimina propiedades que no están definidas en el DTO
    }),
  );

  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();