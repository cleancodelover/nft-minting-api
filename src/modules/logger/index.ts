import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        // Console Transport (for debugging in the terminal)
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),  // Set timestamp format
            winston.format.colorize(),
            winston.format.printf(({ level, message, timestamp }) => {
              return `[${timestamp}] ${level}: ${message}`;
            }),
          ),
        }),

        // File Transport (for saving error logs)
        new winston.transports.File({
          filename: '../../../errorlogs/errors.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),  // Set timestamp format
            winston.format.json(),  // Save logs in JSON format
          ),
        }),
      ],
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
