import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'env.schema';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { InternalErrorExceptionFilter } from 'libs/exceptions/internal-error-exception.filter';
import { TransformInterceptor } from 'libs/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new InternalErrorExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle(env.PROJECT_TITLE)
    .setDescription(env.PROJECT_DESCRIPTION as string)
    .setVersion(env.PROJECT_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
    customSiteTitle: env.PROJECT_TITLE,
  });
  await app.listen(env.PORT);
}
bootstrap();
