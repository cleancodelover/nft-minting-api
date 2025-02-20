import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ApiResponseType } from "src/shared/types/global";

@Injectable()
export class HttpResponseHelper {
  static respondWith200Ok<T> (data: ApiResponseType<T>) {
    throw new HttpException(
      {
        success: true,
        message: data.message,
        count: data.count ?? 0,
        error: null,
        data: data.data,
      },
      HttpStatus.OK,
    );
  };
  static respondWith400BadRequest<T> (data: ApiResponseType<T>) {
    throw new BadRequestException({
      success: false,
      message: data.message,
      error: data.error,
      data: null,
    });
  };
  static respondWith404NotFound<T> (data: ApiResponseType<T>) {
    throw new NotFoundException({
      success: false,
      message: data.message,
      error: null,
      data: null,
    });
  };
  static respondWith401Unauthorized<T> (data: ApiResponseType<T>) {
    throw new UnauthorizedException({
      success: false,
      message: data.message,
      error: null,
      data: null,
    });
  };
  static respondWith403Forbidden<T> (data: ApiResponseType<T>) {
    throw new ForbiddenException({
      success: false,
      message: data.message,
      error: null,
      data: null,
    });
  };
  static respondWith409Conflict<T> (data: ApiResponseType<T>) {
    throw new ForbiddenException({
      success: false,
      message: data.message,
      error: null,
      data: data,
    });
  };
  static respondWith201Created<T> (data: ApiResponseType<T>) {
    throw new HttpException(
      {
        success: true,
        message: data.message,
        error: null,
        data: data.data,
      },
      HttpStatus.CREATED,
    );
  };
  static respondWith500InternalServerError<T> (data: ApiResponseType<T>) {
    throw new InternalServerErrorException({
      success: false,
      message: data.message,
      error: data.error,
      data: null,
    });
  };
  static respondWith204NoContent<T> (data: ApiResponseType<T>) {
    throw new HttpException(
      {
        success: false,
        message: data.message,
        error: null,
        data: data,
      },
      HttpStatus.NO_CONTENT,
    );
  };
}