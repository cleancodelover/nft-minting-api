import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ValidationExceptionFilter } from './middlewares/exception';
import { GlobalExceptionsFilter } from './middlewares/exception/global';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI, // or VersioningType.HEADER / MEDIA_TYPE
  });
  app.enableCors({
    origin: 'http://localhost:3001', // Allow specific origin
    credentials: true, // Allow cookies, authentication headers
  });
  // Use Helmet to secure headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'"],
          frameAncestors: ["'none'"],
        },
      },
    }),
  );

  // Use global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      validationError: { target: false, value: false },
    }),
  );

  // Use Winston as Global Logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Get Winston Logger
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  // Use Global Exception Filters
  app.useGlobalFilters(
    new ValidationExceptionFilter(logger),
    new GlobalExceptionsFilter(logger),
  );
  const versions = ['1', '2'];
  versions.forEach((version) => {
    const config = new DocumentBuilder()
      .setTitle(`My API v${version}`)
      .setDescription('API documentation')
      .setVersion(version)
      .addServer(`/v${version}`)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`v${version}/documentation`, app, document);
  });

  await app.listen(process.env.PORT ?? 3000);
  logger.log(
    `Server running on port http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
