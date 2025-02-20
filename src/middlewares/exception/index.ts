import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST; // Change to your required status code

    const exceptionResponse = exception.getResponse() as any;
    const message = exceptionResponse.message || 'Validation failed';

    response.status(status).json({
      success: false,
      status,
      message: Array.isArray(message) ? message.join(', ') : message,
      error: null,
      data: null,
    });
  }
}
