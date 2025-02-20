import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './middlewares/exception';
import { GlobalExceptionsFilter } from './middlewares/exception/global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use Helmet to secure headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives:{
          
        }
      }
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      validationError: { target: false, value: false },
    }),
  );

  app.useGlobalFilters( new ValidationExceptionFilter(), new GlobalExceptionsFilter() );
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
