import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // prefijo global para todas las rutas
  app.setGlobalPrefix('cyberlearn');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
