import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = morgan('dev');

  use(req: Request, res: Response, next: (error?: any) => void) {
    this.logger(req, res, next);
  }
}

export function loggerMiddlewareFactory(configService: ConfigService) {
  const format = configService.get<string>('HTTP_LOG_FORMAT') || 'dev';
  return morgan(format);
}
