import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();  

  const options = new DocumentBuilder()
    .setTitle('Sample NestJs OpenAPI')
    .setDescription('Sample NestJs OpenAPI specification')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(7000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
