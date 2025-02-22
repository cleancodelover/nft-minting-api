//#region Imports
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'winston';
//#endregion

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(@Inject('winston') private readonly logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();
    
    const ip = (request.headers['x-forwarded-for'] as string) || request.connection?.remoteAddress || 'Unknown IP';

    const method = request.method;
    const url = request.originalUrl || request.url;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';
    let error = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || message;
        error = (exceptionResponse as any).error || null;
      } else {
        message = exceptionResponse;
      }
    }

    // Log error with Winston
    this.logger.error({
      timestamp,
      level: 'error',
      message,
      error: exception.stack || error,
      status,
      method,
      url,
      ip,
    });

    // Send error response to user
    response.status(status).json({
      success: false,
      status,
      message: Array.isArray(message) ? message.join(', ') : message,
      error: null,
      data: null,
    });
  }
}
