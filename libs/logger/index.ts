import * as winston from 'winston';
const { combine, timestamp, json, errors } = winston.format;

export const defaultLogger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [new winston.transports.Console()],
});
