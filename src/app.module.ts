import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './database/connection/PrismaModule';
import { APP_GUARD } from '@nestjs/core';
import { RequestGuard } from './middlewares/helmet';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../src/public'),
    }),
    PrismaModule,
  ],
  providers:[
    {
      provide: APP_GUARD,
      useClass: RequestGuard,
    }
  ]
})
export class AppModule {}
