import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Check if exception is an instance of HttpException (like BadRequestException)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      // Handle Validation Errors
      if (exception instanceof BadRequestException && typeof errorResponse === 'object' && errorResponse['message']) {
        message = errorResponse['message'].join(', '); // Convert multiple errors into a single message
      } else {
        message = errorResponse['message'] || 'An error occurred';
      }
    }

    response.status(status).json({
      success: false,
      status,
      message,
      error: null,
      data: null,
    });
  }
}
