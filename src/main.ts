import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 4000
  app.enableCors()
  
  // Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(port);

  console.log(`
    =============================================================
    🚀🚀🚀 BFF Running on: http://localhost:${port}/bff 🚀🚀🚀
    =============================================================
  `)

}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
