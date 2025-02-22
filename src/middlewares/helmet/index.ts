import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class RequestGuard implements CanActivate {
  constructor(private readonly config: ConfigService){}
  private allowedDomain = this.config.get('JWT_AUDIENCE');
  private environment = this.config.get('ENVIRONMENT');

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const origin = request.headers.origin;
    const referer = request.headers.referer;
    const userAgent = request.headers['user-agent'] || '';

    if(this.environment === 'Production'){

      if (!origin || origin !== this.allowedDomain) {
        throw new ForbiddenException('Access denied: Unauthorized origin');
      }

      if (referer && !referer.startsWith(this.allowedDomain)) {
        throw new ForbiddenException('Access denied: Unauthorized referer');
      }

      const isBrowser = /Mozilla|Chrome|Safari|Firefox/i.test(userAgent);
      if (!isBrowser) {
        throw new ForbiddenException('Access denied: Unauthorized source');
      }
    }

    return true;
  }
}
