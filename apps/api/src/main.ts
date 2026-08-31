import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  // WEB_APP_URL accepte une liste séparée par des virgules : ça permet de
  // développer via localhost et de tester depuis un téléphone sur le même
  // réseau (via l'IP locale) en même temps, sans reconfigurer à chaque fois.
  const allowedOrigins = (process.env.WEB_APP_URL ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim());

  app.enableCors({
    origin: allowedOrigins,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // rejette tout champ non déclaré dans les DTO
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
