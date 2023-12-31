import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  // app.enableCors({ credentials: true, origin: false });
  app.enableCors();

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  const config = new DocumentBuilder()
    .setTitle('Облачное хранилище')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT || 80);
}
bootstrap();
