import { Injectable } from '@nestjs/common';
import { env } from 'env.schema';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, errors, json } = winston.format;

@Injectable()
export class LogService {
  readonly logger: winston.Logger;
  constructor() {
    this.logger = winston.createLogger({
      level: env.APP_LOG_LEVEL,
      format: combine(timestamp(), errors({ stack: true }), json()),
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: 'logs',
          filename: 'app.logs.%DATE%.jsonl',
          maxSize: '1m',
          maxFiles: '14d',
          format: combine(timestamp(), errors({ stack: true }), json()),
        }),
      ],
      defaultMeta: { service: 'root-logger' },
    });
  }
}
