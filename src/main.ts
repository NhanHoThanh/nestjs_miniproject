import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // will remove the properties that are not in the DTO
      //forbidNonWhitelisted: true, // will throw an error if the properties are not in the DTO
      //transform: true, // will transform the incoming data to the DTO type
    }),
  ); // to use the validation pipe globally  in the application
  await app.listen(3000);
}
bootstrap();
