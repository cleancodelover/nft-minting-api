import { HttpStatus, Injectable } from "@nestjs/common";
import { HttpResponseHelper } from "./response";

@Injectable()
export class HandleResponse {
  constructor() {}
  static handle<T>(data): any {
    switch (data.status) {
      case HttpStatus.OK:
        return HttpResponseHelper.respondWith200Ok<T>(data);
      case HttpStatus.UNAUTHORIZED:
        return HttpResponseHelper.respondWith401Unauthorized<T>(data);
      case HttpStatus.NOT_FOUND:
        return HttpResponseHelper.respondWith404NotFound<T>(data);
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return HttpResponseHelper.respondWith500InternalServerError<T>(data);
      case HttpStatus.FORBIDDEN:
        return HttpResponseHelper.respondWith403Forbidden<T>(data);
      case HttpStatus.CONFLICT:
        return HttpResponseHelper.respondWith403Forbidden<T>(data);
      case HttpStatus.BAD_REQUEST:
        return HttpResponseHelper.respondWith400BadRequest<T>(data);
      case HttpStatus.CREATED:
        return HttpResponseHelper.respondWith201Created<T>(data);
      default:
        return HttpResponseHelper.respondWith204NoContent<T>(data);
    }
  }
}
