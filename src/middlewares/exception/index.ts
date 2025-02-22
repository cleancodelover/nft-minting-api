//#region Imports
import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpStatus, Inject } from '@nestjs/common';
import { Response, Request } from 'express';
import { Logger } from 'winston';
//#endregion

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(@Inject('winston') private readonly logger: Logger) {}
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();
    
      const timestamp = new Date().toISOString();
      
      const ip = (request.headers['x-forwarded-for'] as string) || request.connection?.remoteAddress || 'Unknown IP';
  
      const method = request.method;
      const url = request.originalUrl || request.url;
    
    const status = HttpStatus.BAD_REQUEST;

    const exceptionResponse = exception.getResponse() as any;
    const messages = exceptionResponse.message || 'Validation failed';

    const message = Array.isArray(messages) ? messages.join(', ') : messages;

    this.logger.error({
      timestamp,
      level: 'error',
      message,
      error: exception.stack || null,
      status,
      method,
      url,
      ip,
    });

    response.status(status).json({
      success: false,
      status,
      message,
      error: null,
      data: null,
    });
  }
}
